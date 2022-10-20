import React, { useEffect, useState } from "react";
import { PromiseList } from "./style";
import PromiseBox from "../../components/PromiseBox";

const Main = () => {
  const [numOfColumns, setNumOfColumns] = useState(3);
  const recountColumns = () => {
    let column = Math.floor(window.innerWidth / 320);
    console.log(column);
    setNumOfColumns(column > 3 ? 3 : column);
  };

  useEffect(() => {
    window.addEventListener("resize", recountColumns);
    return () => {
      window.removeEventListener("resize", recountColumns);
    };
  }, [window]);

  return (
    <PromiseList>
      <PromiseBox></PromiseBox>
      <PromiseBox></PromiseBox>
      <PromiseBox></PromiseBox>
      <PromiseBox></PromiseBox>
      <PromiseBox></PromiseBox>
      <PromiseBox></PromiseBox>
      <PromiseBox></PromiseBox>
      <PromiseBox></PromiseBox>
      <PromiseBox></PromiseBox>
      <PromiseBox></PromiseBox>
      <PromiseBox></PromiseBox>
      <PromiseBox></PromiseBox>
    </PromiseList>
  );
};

export default Main;
