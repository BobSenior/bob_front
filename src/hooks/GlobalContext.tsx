import React, { Dispatch } from "react";
import { createContext } from "react";
import { MyDataDTO } from "../types/db";

export type IMyDataContext = {
  myData: MyDataDTO | undefined;
  setMyData: Dispatch<React.SetStateAction<MyDataDTO | undefined>>;
};

const MyDataContext: IMyDataContext = {
  myData: undefined,
  setMyData: () => {},
};

const GlobalContext = createContext<IMyDataContext>(MyDataContext);

export default GlobalContext;
