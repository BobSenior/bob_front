import { ICoordinate } from "../types/db";

const getCoordinateNumber = (x: string, y: string): ICoordinate => {
  const coord: ICoordinate = {
    longitude: parseFloat(x),
    latitude: parseFloat(y),
  };
  return coord;
};

export default getCoordinateNumber;
