import { useParams } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PromiseBox from "../../components/PromiseBox";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { PromisesColumn, PromisesWrapper } from "../Main/style";
import { promiseInfo } from "../../types/db";

const p2: promiseInfo[] = [
  {
    name: "라이언",
    ID: 22,
    title: "밥먹을 사람!",
    major: "미디어커뮤니테이션학부",
    place: "흑석동",
    time: "10월 30일",
    createdAt: "2022-10-30",
  },
  {
    name: "라이언",
    ID: 22,
    title: "밥먹을 사람!",
    major: "에너지시스템공학부",
    place: "흑석동",
    time: "10월 30일",
  },
  {
    name: "어피치",
    ID: 21,
    title: "밥먹을 사람12!",
    major: "생명자원공학부",
    place: "상도동",
    time: "10월 29일",
  },
  {
    name: "야다",
    ID: 21,
    title: "아무나1",
    major: "물리학과",
    place: "상도동",
    time: "10월 29일",
  },
];

const Search = () => {
  const { input } = useParams();
  const [numOfColumns, setNumOfColumns] = useState<number>(1);

  const columnDivs = useMemo(() => {
    const tempColDivs = new Array(numOfColumns);
    for (let i = 0; i < numOfColumns; i++) tempColDivs[i] = [];

    p2.forEach((value, index) => {
      tempColDivs[index % numOfColumns].push(
        <PromiseBox data={value} key={generateUniqueID()} />
      );
    });
    return tempColDivs;
  }, [numOfColumns]);

  const recountColumns = useCallback(() => {
    let num = Math.floor(window.innerWidth / 350);
    if (num > 3) {
      num = 3;
    } else if (num < 1) {
      num = 1;
    }
    setNumOfColumns(num);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", recountColumns);
    recountColumns();
    return () => {
      window.removeEventListener("resize", recountColumns);
    };
  }, [window.innerWidth]);

  return (
    <PromisesWrapper>
      {input}
      {columnDivs.map((value) => {
        return (
          <PromisesColumn key={generateUniqueID()}>{value}</PromisesColumn>
        );
      })}
    </PromisesWrapper>
  );
};

export default Search;
