import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import { PlansHeader, PlansWrapper } from "./style";
import { promiseInfo } from "../../types/db";
import { PromisesColumn, PromisesWrapper } from "../Main/style";
import PlanBox from "../../components/PlanBox";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";

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

const Plans = () => {
  const { plan } = useParams();
  const navigate = useNavigate();
  const [numOfColumns, setNumOfColumns] = useState<number>(1);

  const columnDivs = useMemo(() => {
    const tempColDivs = new Array(numOfColumns);
    for (let i = 0; i < numOfColumns; i++) tempColDivs[i] = [];

    p2.forEach((value, index) => {
      tempColDivs[index % numOfColumns].push(
        <PlanBox data={value} key={generateUniqueID()} />
      );
    });
    return tempColDivs;
  }, [numOfColumns]);

  const recountColumns = () => {
    let num = Math.floor(window.innerWidth / 400);
    if (num > 2) {
      num = 2;
    } else if (num < 1) {
      num = 1;
    }
    setNumOfColumns(num);
  };

  useEffect(() => {
    window.addEventListener("resize", recountColumns);
    recountColumns();
    return () => {
      window.removeEventListener("resize", recountColumns);
    };
  }, [window]);

  return (
    <PlansWrapper>
      <PlansHeader>
        <LayoutBtn
          text={"참가 중"}
          onClick={() => {
            navigate(`../plans/participating`);
          }}
          animate={plan === "participating" ? "pushed" : ""}
        />
        <LayoutBtn
          text={"대기 중"}
          onClick={() => {
            navigate(`../plans/waiting`);
          }}
          animate={plan === "waiting" ? "pushed" : ""}
        />
      </PlansHeader>
      <PromisesWrapper>
        {columnDivs.map((value) => {
          return (
            <PromisesColumn key={generateUniqueID()}>{value}</PromisesColumn>
          );
        })}
      </PromisesWrapper>
    </PlansWrapper>
  );
};

export default Plans;
