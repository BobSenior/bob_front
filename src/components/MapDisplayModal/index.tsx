/** @jsxImportSource @emotion/react */
import Modal from "../Modal";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import React, { Dispatch, useEffect, useState } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { css } from "@emotion/react";

const searchBtnCSS = css`
  width: fit-content;
  padding: 1.5px 3px;
  border-radius: 5px;
  text-transform: uppercase;
  margin: 2px;
`;

interface Props {
  setShow: Dispatch<React.SetStateAction<boolean>>;
  address: string;
}

interface coordination {
  latitude: number;
  longitude: number;
  index: number;
}

const messageList = {
  ERROR: "알 수 없는 오류가 발생했습니다.",
  ZERO_RESULT: "결과를 찾을 수 없습니다.",
};

const MapDisplayModal = ({ setShow, address }: Props) => {
  const [resultStatus, setResultStatus] = useState<kakao.maps.services.Status>(
    kakao.maps.services.Status.ZERO_RESULT
  );
  const [coords, setCoords] = useState<coordination>({
    latitude: 37.497952,
    longitude: 127.027619,
    index: 0,
  });
  const [searchResults, setSearchResults] = useState<
    kakao.maps.services.PlacesSearchResultItem[] | null
  >(null);

  useEffect(() => {
    try {
      const places = new kakao.maps.services.Places();
      places.keywordSearch(address, function (result, status) {
        console.log(status);
        if (status === kakao.maps.services.Status.OK) {
          setCoords({
            latitude: parseFloat(result[0].y),
            longitude: parseFloat(result[0].x),
            index: 0,
          });
          setSearchResults(result);
        }
        setResultStatus(status);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Modal setShow={setShow}>
      <div style={{ width: "100%" }}>
        <span>
          - <strong>{address}</strong>의 검색결과:{" "}
          <i>{searchResults?.[coords.index].address_name}</i>
        </span>
        {resultStatus != kakao.maps.services.Status.OK ? (
          <div style={{ height: "60vh", width: " 100%" }}>
            {messageList[resultStatus]}
          </div>
        ) : (
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              {searchResults?.slice(0, 5).map((value, index) => {
                return (
                  <button
                    key={generateUniqueID()}
                    onClick={() =>
                      setCoords({
                        latitude: parseFloat(value.y),
                        longitude: parseFloat(value.x),
                        index: index,
                      })
                    }
                    css={searchBtnCSS}
                  >
                    {index + 1 + ". " + value.address_name.slice(0, 6)}
                  </button>
                );
              })}
            </div>
            <Map
              style={{ height: "60vh", width: "100%" }}
              center={{ lat: coords.latitude, lng: coords.longitude }}
            >
              <MapMarker
                position={{ lat: coords.latitude, lng: coords.longitude }}
                title={address ?? ""}
              ></MapMarker>
            </Map>
          </>
        )}
      </div>
    </Modal>
  );
};

export default MapDisplayModal;
