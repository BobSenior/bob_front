import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import { PlansHeader, PlansWrapper } from "./style";
import { AppointmentHeadDTO } from "../../types/db";
import {
  PageSpinnerWrapper,
  PromisesColumn,
  PromisesWrapper,
} from "../Main/style";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { infiniteFetcher } from "../../utils/fetchers";
import countColumns from "../../utils/countColumns";
import PostHeadBox from "../../components/PostBox";
import AppointmentBox from "../../components/AppointmentBox";
import { testUserIdx } from "../Main";
import useSWRInfinite from "swr/infinite";
import { Oval } from "react-loader-spinner";

const pageParams = {
  참가중: "participating",
  대기중: "waiting",
};

const pageSize = 10;

const Appointments = () => {
  const [numOfColumns, setNumOfColumns] = useState<number>(
    countColumns({ totalWidth: window.innerWidth })
  );
  const { plan } = useParams();
  const navigate = useNavigate();

  const {
    data: ParticipatingAppointment,
    error: PAError,
    isValidating: PAIsValidating,
    setSize: PASetSize,
  } = useSWRInfinite<AppointmentHeadDTO[]>(
    (pageIndex: number) => {
      return `/appointment/ongoing?size=${pageSize}&page=${pageIndex}&userIdx=${testUserIdx}`;
    },
    infiniteFetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      dedupingInterval: 2000,
      revalidateFirstPage: false,
    }
  );
  const {
    data: WaitingAppointment,
    error: WAError,
    isValidating: WAIsValidating,
    setSize: WASetSize,
  } = useSWRInfinite<AppointmentHeadDTO[]>(
    (pageIndex: number) => {
      return `/post/waiting?size=${pageSize}&page=${pageIndex}&userIdx=${testUserIdx}`;
    },
    infiniteFetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      dedupingInterval: 2000,
      revalidateFirstPage: false,
    }
  );

  const isPAEmpty = ParticipatingAppointment?.[0]?.length === 0;
  const isPAReachingEnd =
    isPAEmpty ||
    (ParticipatingAppointment &&
      ParticipatingAppointment[ParticipatingAppointment.length - 1]?.length <
        pageSize);

  const isWAEmpty = WaitingAppointment?.[0]?.length === 0;
  const isWAReachingEnd =
    isWAEmpty ||
    (WaitingAppointment &&
      WaitingAppointment[WaitingAppointment.length - 1]?.length < pageSize);

  const getNextPage = useCallback(() => {
    let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
    let windowHeight = window.innerHeight; // 스크린 창
    let fullHeight = document.body.scrollHeight; //  margin 값은 포함 x
    if (scrollLocation + windowHeight >= fullHeight) {
      switch (plan) {
        case pageParams.참가중:
          if (!isPAReachingEnd)
            PASetSize((size) => size + 1)
              .then(() => {})
              .catch((err) => console.log(err));
          break;
        case pageParams.대기중:
          if (!isWAReachingEnd)
            WASetSize((size) => size + 1)
              .then(() => {})
              .catch((err) => console.log(err));
          break;
        default:
          break;
      }
    }
  }, [PAIsValidating, WAIsValidating, isPAReachingEnd, isWAReachingEnd, plan]);

  const endSpan = useMemo(() => {
    let str = "";
    if (plan === pageParams.참가중) {
      if (isPAEmpty) {
        str = "참가 중인 약속이 없어요.";
      } else {
        if (PAIsValidating)
          return (
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
          );
        else if (isPAReachingEnd) str = "마지막 약속이예요.";
      }
    } else if (plan === pageParams.대기중) {
      if (isWAEmpty) {
        str = "참가 대기 중인 약속이 없어요.";
      } else {
        if (WAIsValidating)
          return (
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
          );
        else if (isWAReachingEnd) str = "마지막 약속이예요.";
      }
    }
    return <span className={"end-point"}>{str}</span>;
  }, [
    plan,
    isPAEmpty,
    isWAEmpty,
    isPAReachingEnd,
    isWAReachingEnd,
    PAIsValidating,
    WAIsValidating,
    ParticipatingAppointment,
    WaitingAppointment,
    pageParams,
  ]);

  const columnDivs = useMemo(() => {
    const tempColDivs = new Array(numOfColumns);
    for (let i = 0; i < numOfColumns; i++) tempColDivs[i] = [];

    if (plan === pageParams.참가중 && ParticipatingAppointment) {
      ParticipatingAppointment.flat().forEach((value, index) => {
        tempColDivs[index % numOfColumns].push(
          <AppointmentBox data={value} key={generateUniqueID()} />
        );
      });
    } else if (plan === pageParams.대기중 && WaitingAppointment) {
      WaitingAppointment.flat().forEach((value, index) => {
        tempColDivs[index % numOfColumns].push(
          <PostHeadBox data={value} key={generateUniqueID()} />
        );
      });
    }
    return tempColDivs;
  }, [numOfColumns, ParticipatingAppointment, WaitingAppointment, plan]);

  const recountColumns = useCallback(() => {
    setNumOfColumns(countColumns({ totalWidth: window.innerWidth }));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", recountColumns);
    window.addEventListener("scroll", getNextPage);
    return () => {
      window.removeEventListener("resize", recountColumns);
      window.removeEventListener("scroll", getNextPage);
    };
  }, []);

  return (
    <PlansWrapper>
      <PlansHeader>
        <LayoutBtn
          text={"참가 중"}
          height={"38px"}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`../plans/${pageParams.참가중}`);
          }}
          animate={plan === pageParams.참가중 ? "pushed" : ""}
        />
        <LayoutBtn
          text={"대기 중"}
          height={"38px"}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`../plans/${pageParams.대기중}`);
          }}
          animate={plan === pageParams.대기중 ? "pushed" : ""}
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
      <PageSpinnerWrapper>{endSpan}</PageSpinnerWrapper>
    </PlansWrapper>
  );
};

export default Appointments;
