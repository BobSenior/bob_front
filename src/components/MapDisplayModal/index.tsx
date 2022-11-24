import Modal from "../Modal";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../hooks/GlobalContext";

interface props {
  isVisible: boolean;
  onClickForClose: () => void;
}

interface coordination {
  latitude: number;
  longitude: number;
}

const messageList = {
  ERROR: "알 수 없는 오류가 발생했습니다.",
  ZERO_RESULT: "결과를 찾을 수 없습니다.",
};

const MapDisplayModal = ({ isVisible, onClickForClose }: props) => {
  const { address } = useContext(GlobalContext);
  const [resultStatus, setResultStatus] = useState<kakao.maps.services.Status>(
    kakao.maps.services.Status.ZERO_RESULT
  );
  const [coords, setCoords] = useState<coordination>({
    latitude: 36,
    longitude: 127,
  });

  useEffect(() => {
    if (!isVisible) return;
    try {
      const geocoder = new kakao.maps.services.Geocoder();

      if (address)
        geocoder.addressSearch(address, function (result, status, {}) {
          if (status === kakao.maps.services.Status.OK) {
            setCoords({
              latitude: parseFloat(result[0].y),
              longitude: parseFloat(result[0].x),
            });
          }
          setResultStatus(status);
        });
    } catch (error) {
      console.log(error);
    }
  }, [isVisible]);

  return (
    <Modal isVisible={isVisible} onClickForClose={onClickForClose}>
      {resultStatus === kakao.maps.services.Status.OK ? (
        <Map
          center={{ lat: coords.latitude, lng: coords.longitude }}
          style={{ width: "100%", height: "60vh" }}
        >
          <MapMarker
            position={{ lat: coords.latitude, lng: coords.longitude }}
            title={address ?? ""}
          ></MapMarker>
        </Map>
      ) : (
        <div style={{ width: "280px", height: "320px" }}>
          {messageList[resultStatus]}
        </div>
      )}
    </Modal>
  );
};

export default MapDisplayModal;
