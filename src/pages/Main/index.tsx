import React from "react";
import { PromiseList } from "./style";
import PromiseBox from "../../components/PromiseBox";

const Main = () => {
  return (
    <PromiseList>
      <PromiseBox></PromiseBox>
      <PromiseBox></PromiseBox>
      <PromiseBox></PromiseBox>
    </PromiseList>
  );
};

export default Main;
