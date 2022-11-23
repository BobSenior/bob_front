import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import { PlansHeader, PlansWrapper } from "./style";
import {
  AppointmentHeadDTO,
  BaseResponse,
  promiseInfo,
  SimplifiedUserProfileDTO,
} from "../../types/db";
import { PromisesColumn, PromisesWrapper } from "../Main/style";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import useSWR from "swr";
import { getFetcher } from "../../utils/fetchers";
import countColumns from "../../utils/countColumns";
import PostHeadBox from "../../components/PostBox";
import AppointmentBox from "../../components/AppointmentBox";
import dayjs from "dayjs";

const sm: SimplifiedUserProfileDTO = {
  userIdx: 1,
  nickname: "123456789012345",
  department: "소프트웨어학부",
  schoolId: 22,
  school: "중앙대학교",
  isOnline: true,
};

export const p2: AppointmentHeadDTO[] = [
  {
    postIdx: 1,
    title: "가나다라마바사아자차카타파하가나다라",
    writtenAt: dayjs().toString(),
    imageURL: null,
    writer: sm,
    location: "흑석",
    meetingAt: dayjs().toString(),
    type: "같이먹자",
    status: "?",
    totalNum: 4,
    currNum: 2,
    waitingNum: 1,
    tagHeads: ["123", "456"],
  },
];

const Appointments = () => {
  const { plan } = useParams();
  const navigate = useNavigate();
  const [numOfColumns, setNumOfColumns] = useState<number>(1);
  // const { data: ParticipatingAppointment, error: PAError } = useSWR<
  //   BaseResponse<AppointmentHeadDTO[]>
  // >("/appointment/ongoing?userIdx=11", getFetcher);
  // const { data: WaitingAppointment, error: WAError } = useSWR<
  //   BaseResponse<AppointmentHeadDTO[]>
  // >("/post/waiting?userIdx=11", getFetcher);

  const columnDivs = useMemo(() => {
    const tempColDivs = new Array(numOfColumns);
    for (let i = 0; i < numOfColumns; i++) tempColDivs[i] = [];

    if (plan === "participating") {
      p2.forEach((value, index) => {
        tempColDivs[index % numOfColumns].push(
          <AppointmentBox data={value} key={generateUniqueID()} />
        );
      });
    } else if (plan === "waiting") {
      p2.forEach((value, index) => {
        tempColDivs[index % numOfColumns].push(
          <PostHeadBox data={value} key={generateUniqueID()} />
        );
      });
    }
    return tempColDivs;
  }, [
    numOfColumns,
    // ParticipatingAppointment,
    plan,
  ]);

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
    <PlansWrapper>
      <PlansHeader>
        <LayoutBtn
          text={"참가 중"}
          height={"38px"}
          onClick={() => {
            navigate(`../plans/participating`);
          }}
          animate={plan === "participating" ? "pushed" : ""}
        />
        <LayoutBtn
          text={"대기 중"}
          height={"38px"}
          onClick={() => {
            navigate(`../plans/waiting`);
          }}
          animate={plan === "waiting" ? "pushed" : ""}
        />
      </PlansHeader>
      <PromisesWrapper
        style={{ gridTemplateColumns: `repeat(${numOfColumns}, 1fr)` }}
      >
        {columnDivs.map((value) => {
          return (
            <PromisesColumn key={generateUniqueID()}>{value}</PromisesColumn>
          );
        })}
      </PromisesWrapper>
    </PlansWrapper>
  );
};

export default Appointments;
