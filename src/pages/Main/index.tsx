import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { PromisesColumn, PromisesWrapper } from "./style";
import PromiseBox from "../../components/PromiseBox";
import { promiseInfo } from "../../types/db";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import countColumns from "../../utils/countColumns";
import { Oval } from "react-loader-spinner";

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
  {
    name: "야다",
    ID: 21,
    title: "아무나1",
    major: "물리학과",
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
  {
    name: "야다",
    ID: 21,
    title: "아무나1",
    major: "물리학과",
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
  {
    name: "야다",
    ID: 21,
    title: "아무나1",
    major: "물리학과",
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
  {
    name: "야다",
    ID: 21,
    title: "아무나1",
    major: "물리학과",
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
  {
    name: "야다",
    ID: 21,
    title: "아무나1",
    major: "물리학과",
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
  {
    name: "야다",
    ID: 21,
    title: "아무나1",
    major: "물리학과",
    place: "상도동",
    time: "10월 29일",
  },
];

const Main = () => {
  const [numOfColumns, setNumOfColumns] = useState<number>(1);
  const [isReachingEnd, setReachingEnd] = useState(true);

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
    const num = countColumns({ totalWidth: window.innerWidth });
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
    <>
      <PromisesWrapper>
        {columnDivs.map((value) => {
          return (
            <PromisesColumn key={generateUniqueID()}>{value}</PromisesColumn>
          );
        })}
      </PromisesWrapper>
      <div
        style={{
          minHeight: "7vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        {isReachingEnd ? (
          <span style={{ fontSize: "0.85em", color: "gray" }}>
            더 이상 약속이 없어요.
          </span>
        ) : (
          <Oval
            height={"5vh"}
            width={"5vh"}
            color={"var(--basic-color)"}
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor={"#828282"}
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}
      </div>
    </>
  );
};

export default memo(Main);
