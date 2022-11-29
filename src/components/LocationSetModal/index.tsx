import Modal from "../Modal";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import React, { Dispatch, FormEvent, useCallback, useState } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import {
  Header,
  HorizontalScrollMenu,
  ResultsSpan,
  SearchContainer,
  Wrapper,
} from "./style";
import { HandleVariant } from "../../pages/Compose/style";
import SendSvg from "../../assets/icons/send-sharp.svg";
import SearchSvg from "../../assets/icons/search-circle.svg";
import { SendButton } from "../ChatBox/styles";
import { ICoordinate } from "../../types/db";
import search from "../../pages/Search";

interface Props {
  setShow: Dispatch<React.SetStateAction<boolean>>;
  setLocation: Dispatch<React.SetStateAction<string | null>>;
  setCoords: Dispatch<React.SetStateAction<ICoordinate | null>>;
}

type MsgType = {
  [anyKeyword: string]: string;
  ERROR: string;
  ZERO_RESULT: string;
};

const messageList: MsgType = {
  ERROR: "알 수 없는 오류가 발생했습니다.",
  ZERO_RESULT: "결과를 찾을 수 없습니다.",
};

const LocationSetModal = ({ setShow, setLocation, setCoords }: Props) => {
  const [resultStatus, setResultStatus] = useState<kakao.maps.services.Status>(
    kakao.maps.services.Status.ZERO_RESULT
  );
  const [inputPlace, setSearchPlace] = useState<string>("");
  const [curCoords, setCurCoords] = useState<ICoordinate | null>();
  const [searchResults, setSearchResults] = useState<
    kakao.maps.services.PlacesSearchResultItem[] | null
  >(null);

  const onSearchPlaces = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setCurCoords(null);
      setSearchResults(null);
      try {
        const places = new kakao.maps.services.Places();
        places.keywordSearch(inputPlace, function (result, status) {
          console.log(status);
          if (status === kakao.maps.services.Status.OK) {
            setCurCoords({
              latitude: parseFloat(result[0].y),
              longitude: parseFloat(result[0].x),
            });
            setSearchResults(result);
            console.log(result);
          }
          setResultStatus(status);
        });
      } catch (error) {
        console.log(error);
      }
    },
    [inputPlace]
  );

  return (
    <Modal setShow={setShow}>
      <Wrapper>
        <Header>
          <SearchContainer>
            <form onSubmit={onSearchPlaces}>
              <button>
                <img
                  src={SearchSvg}
                  height={"30px"}
                  width={"30px"}
                  alt={"search"}
                />
              </button>
              <input
                type={"search"}
                value={inputPlace}
                onChange={(e) => {
                  setSearchPlace(e.target.value);
                  setCurCoords(null);
                }}
                placeholder={"검색내용도 장소에 포함돼요."}
              />
            </form>
          </SearchContainer>
          <SendButton
            aria-label="Send message"
            type="submit"
            disabled={!inputPlace || !curCoords}
            animate={!inputPlace || !curCoords ? "off" : "on"}
            variants={HandleVariant}
            transition={{ duration: 0.1 }}
            onClick={() => {
              if (!inputPlace || !curCoords) return;
              setLocation(inputPlace);
              setCoords(curCoords);
              setShow(false);
            }}
          >
            <img src={SendSvg} width={"22px"} height={"22px"} alt={"send"} />
          </SendButton>
        </Header>
        <HorizontalScrollMenu>
          {searchResults && searchResults.length > 0 ? (
            searchResults?.map((value, index) => {
              return (
                <ResultsSpan
                  key={generateUniqueID()}
                  onClick={() =>
                    setCurCoords({
                      latitude: parseFloat(value.y),
                      longitude: parseFloat(value.x),
                    })
                  }
                >
                  <strong>{index + 1}</strong>
                  {value.address_name.slice(0, 6)}
                </ResultsSpan>
              );
            })
          ) : (
            <span>{messageList[resultStatus]}</span>
          )}
        </HorizontalScrollMenu>
        {curCoords && (
          <Map
            style={{ height: "50vh", maxWidth: "700px" }}
            center={{ lat: curCoords.latitude, lng: curCoords.longitude }}
            onCenterChanged={(map) =>
              setCurCoords({
                latitude: map.getCenter().getLat(),
                longitude: map.getCenter().getLng(),
              })
            }
          >
            <MapMarker
              image={{
                size: { width: 45, height: 50 },
                options: { offset: { x: 24, y: 42 } },
                src: "https://cdn-icons-png.flaticon.com/512/4249/4249833.png",
              }}
              position={{ lat: curCoords.latitude, lng: curCoords.longitude }}
            ></MapMarker>
          </Map>
        )}
      </Wrapper>
    </Modal>
  );
};

export default LocationSetModal;
