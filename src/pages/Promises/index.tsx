import React, { useEffect, useState } from "react";
import { PromisesColumn, PromisesWrapper } from "./style";
import PromiseBox from "../../components/PromiseBox";
import { promiseInfo } from "../../types/db";

const p1: promiseInfo = {
  name: "라이언",
  ID: "22",
  title: "밥먹을 사람!",
  major: "소프트웨어학부",
  place: "흑석동",
  time: "10월 30일",
};

const Main = () => {
  const [numOfColumns, setNumOfColumns] = useState(3);
  const [loading, setLoading] = useState(false);
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
    <PromisesWrapper>
      <PromisesColumn>
        <div>
          <label>로딩 체크</label>
          <input
            className="form-check-input"
            type="checkbox"
            id={`loadingCheckbox`}
            checked={loading}
            onChange={() => {
              setLoading((b) => !b);
            }}
          />
        </div>
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
        <PromiseBox data={p1} isLoading={loading} />
      </PromisesColumn>
      <PromisesColumn></PromisesColumn>
      <PromisesColumn></PromisesColumn>
    </PromisesWrapper>
  );
};

export default Main;
