import React from "react";
import { createContext } from "react";

export type MapModalContextType = {
  showMapModal: boolean | null;
  setShowMapModal: React.Dispatch<React.SetStateAction<boolean>>;
  address: string | null;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
};

const MapModalContextState = {
  showMapModal: null,
  setShowMapModal: () => {},
  address: null,
  setAddress: () => {},
};

const MapModalContext =
  createContext<MapModalContextType>(MapModalContextState);

export default MapModalContext;
