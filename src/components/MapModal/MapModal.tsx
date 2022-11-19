import Modal from "../Modal";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import React, { memo, useContext, useState } from "react";
import GlobalContext from "../../hooks/GlobalContext";

interface props {
  isVisible: boolean;
  onClickForClose: () => void;
}

interface coordination {
  latitude: number;
  longitude: number;
}

const MapModal = ({ isVisible, onClickForClose }: props) => {
  const { address } = useContext(GlobalContext);
  const [coords, setCoords] = useState<coordination>({
    latitude: 36,
    longitude: 127,
  });

  return (
    <Modal isVisible={isVisible} onClickForClose={onClickForClose}>
      <Map
        center={{ lat: coords.latitude, lng: coords.longitude }}
        style={{ width: "280px", height: "320px" }}
        onCreate={() => {
          try {
            const geocoder = new kakao.maps.services.Geocoder();

            if (address)
              geocoder.addressSearch(address, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                  setCoords({
                    latitude: parseFloat(result[0].y),
                    longitude: parseFloat(result[0].x),
                  });
                }
              });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <MapMarker
          position={{ lat: coords.latitude, lng: coords.longitude }}
          title={address ?? ""}
        ></MapMarker>
      </Map>
    </Modal>
  );
};

export default memo(MapModal);
