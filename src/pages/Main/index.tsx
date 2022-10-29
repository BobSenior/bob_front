import React, { useMemo } from "react";
import { PromisesColumn, PromisesWrapper } from "./style";
import PromiseBox from "../../components/PromiseBox";
import { promiseInfo } from "../../types/db";

const p2: promiseInfo[] = [
  {
    name: "라이언",
    ID: 22,
    title: "밥먹을 사람!",
    major: "미디어커뮤니테이션학부",
    place: "흑석동",
    time: "10월 30일",
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

interface props {
  numOfColumns: number;
}

const Main = ({ numOfColumns }: props) => {
  const columnDivs = useMemo(() => {
    const tempColDivs = new Array(numOfColumns);
    for (let i = 0; i < numOfColumns; i++) tempColDivs[i] = [];

    p2.forEach((value, index) => {
      tempColDivs[index % numOfColumns].push(
        <PromiseBox data={value} key={index} />
      );
    });
    return tempColDivs;
  }, [numOfColumns]);

  return (
    <PromisesWrapper>
      {columnDivs.map((value) => {
        return <PromisesColumn>{value}</PromisesColumn>;
      })}
    </PromisesWrapper>
  );
};

export default Main;
