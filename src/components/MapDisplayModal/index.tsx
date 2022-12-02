import Modal from "../Modal";
import { MapMarker, Map } from "react-kakao-maps-sdk";
import React, { Dispatch } from "react";
import { ICoordinate } from "../../types/db";
import { Wrapper } from "../LocationSetModal/style";

interface Props {
  setShow: Dispatch<React.SetStateAction<boolean>>;
  coordinate: ICoordinate;
  location: string;
}

const MapDisplayModal = ({ setShow, coordinate: coords, location }: Props) => {
  return (
    <Modal setShow={setShow}>
      <Wrapper>
        <Map
          style={{ height: "50vh", maxWidth: "700px" }}
          center={{ lat: coords.latitude, lng: coords.longitude }}
          level={2}
        >
          <MapMarker
            position={{ lat: coords.latitude, lng: coords.longitude }}
            image={{
              size: { width: 45, height: 50 },
              options: { offset: { x: 24, y: 42 } },
              src: "https://cdn-icons-png.flaticon.com/512/4249/4249833.png",
            }}
          >
            <div style={{ padding: "5px", color: "#000", width: "100%" }}>
              {location} <br />
              <a
                href={`https://map.kakao.com/link/map/${location},${coords.latitude},${coords.longitude}`}
                style={{ color: "blue" }}
                target="_blank"
                rel="noreferrer"
              >
                큰지도보기
              </a>
            </div>
          </MapMarker>
        </Map>
      </Wrapper>
    </Modal>
  );
};

export default MapDisplayModal;
