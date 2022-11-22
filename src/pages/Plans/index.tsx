import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import { PlansHeader, PlansWrapper } from "./style";
import {AppointmentHeadDTO, BaseResponse, promiseInfo} from "../../types/db";
import { PromisesColumn, PromisesWrapper } from "../Main/style";
import PlanBox from "../../components/PlanBox";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import PromiseBox from "../../components/PromiseBox";
import countColumns from "../../utils/countColumns";

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
  const [option,setOption] = useState<number>(0);
  const {data:ParticipatingAppointment,error:PAError} = useSWR<BaseResponse<AppointmentHeadDTO[]>>('/appointment/ongoing?userIdx=11',fetcher);
  const {data:WaitingAppointment, error:WAError} = useSWR<BaseResponse<AppointmentHeadDTO[]>>('/post/waiting?userIdx=11',fetcher);

  const columnDivs = useMemo(() => {
    const tempColDivs = new Array(numOfColumns);
    for (let i = 0; i < numOfColumns; i++) tempColDivs[i] = [];

    if(option == 0) {
      ParticipatingAppointment?.result.forEach((value, index) => {
        tempColDivs[index % numOfColumns].push(
            <PlanBox data={value} key={generateUniqueID()}/>
        );
      });
    }
    else if(option == 1){
      WaitingAppointment?.result.forEach((value, index) => {
        tempColDivs[index % numOfColumns].push(
            <PromiseBox data={value} key={generateUniqueID()}/>
        );
      });
    }
    return tempColDivs;
  }, [numOfColumns,ParticipatingAppointment,option]);

  const recountColumns = () => {
    const num = countColumns({ totalWidth: window.innerWidth, maxDivs: 2 });
    setNumOfColumns(num);
  };

  useEffect(() => {
    recountColumns();
    window.addEventListener("resize", recountColumns);
    return () => {
      window.removeEventListener("resize", recountColumns);
    };
  }, [window.innerWidth]);


  return (
    <PlansWrapper>
      <PlansHeader>
        <LayoutBtn
          text={"참가 중"}
          height={"38px"}
          onClick={() => {
            setOption(0);
            navigate(`../plans/participating`);
          }}
          animate={plan === "participating" ? "pushed" : ""}
        />
        <LayoutBtn
          text={"대기 중"}
          height={"38px"}
          onClick={() => {
            setOption(1);
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
