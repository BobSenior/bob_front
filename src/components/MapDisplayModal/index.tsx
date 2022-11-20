import Modal from "../Modal";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import React, { useCallback, useContext, useEffect, useState } from "react";
import GlobalContext from "../../hooks/GlobalContext";

interface props {
  isVisible: boolean;
  onClickForClose: () => void;
}

interface coordination {
  latitude: number;
  longitude: number;
}

const MapDisplayModal = ({ isVisible, onClickForClose }: props) => {
  const { address } = useContext(GlobalContext);
  const [render, setRender] = useState<boolean>(false);
  const [coords, setCoords] = useState<coordination>({
    latitude: 36,
    longitude: 127,
  });

  useEffect(() => {
    if (!isVisible) return;
    try {
      const geocoder = new kakao.maps.services.Geocoder();

      if (address)
        geocoder.addressSearch(address, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            setRender(true);
            setCoords({
              latitude: parseFloat(result[0].y),
              longitude: parseFloat(result[0].x),
            });
            console.log(`${address}: MAP_OK`);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [isVisible]);

  return (
    <Modal isVisible={isVisible} onClickForClose={onClickForClose}>
      {render ? (
        <Map
          center={{ lat: coords.latitude, lng: coords.longitude }}
          style={{ width: "280px", height: "320px" }}
        >
          <MapMarker
            position={{ lat: coords.latitude, lng: coords.longitude }}
            title={address ?? ""}
          ></MapMarker>
        </Map>
      ) : (
        <div style={{ width: "280px", height: "320px" }}></div>
      )}
    </Modal>
  );
};

export default MapDisplayModal;
