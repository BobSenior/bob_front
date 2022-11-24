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

const Appointments = () => {
  const [numOfColumns, setNumOfColumns] = useState<number>(
    countColumns({ totalWidth: window.innerWidth })
  );
  const [isPAReachingEnd, setPAReachingEnd] = useState<boolean>(false);
  const [isWAReachingEnd, setWAReachingEnd] = useState<boolean>(false);
  const { plan } = useParams();
  const navigate = useNavigate();

  const {
    data: ParticipatingAppointment,
    error: PAError,
    isValidating: PAIsValidating,
    size: PASize,
    setSize: PASetSize,
    mutate: PAMutate,
  } = useSWRInfinite<AppointmentHeadDTO[]>(
    (pageIndex: number, previousPageData: AppointmentHeadDTO[][]) => {
      if (
        (previousPageData && previousPageData.length < 10) ||
        !isPAReachingEnd
      ) {
        setPAReachingEnd(true);
        return null;
      }
      return `/appointment/ongoing?size=10&page=${pageIndex}&userIdx=${testUserIdx}`;
    },
    infiniteFetcher
  );
  const {
    data: WaitingAppointment,
    error: WAError,
    isValidating: WAIsValidating,
    size: WASize,
    setSize: WASetSize,
    mutate: WAMutate,
  } = useSWRInfinite<AppointmentHeadDTO[]>(
    (pageIndex: number, previousPageData: AppointmentHeadDTO[][]) => {
      if (
        (previousPageData && previousPageData.length < 10) ||
        !isWAReachingEnd
      ) {
        setWAReachingEnd(true);
        return null;
      }
      return `/post/waiting?size=10&page=${pageIndex}&userIdx=${testUserIdx}`;
    },
    infiniteFetcher
  );

  const getNextPage = useCallback(() => {
    let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
    let windowHeight = window.innerHeight; // 스크린 창
    let fullHeight = document.body.scrollHeight; //  margin 값은 포함 x
    if (scrollLocation + windowHeight >= fullHeight - 5) {
      if (plan === pageParams.참가중 && !isPAReachingEnd) {
        PASetSize(PASize + 1)
          .then(() => console.log(pageParams.참가중 + " 다음 페이지"))
          .catch((err) => console.log(err));
      } else if (plan === pageParams.대기중 && !isWAReachingEnd) {
        WASetSize(WASize + 1)
          .then(() => console.log(pageParams.대기중 + " 다음 페이지"))
          .catch((err) => console.log(err));
      }
    }
  }, [
    isPAReachingEnd,
    isWAReachingEnd,
    PASize,
    PASetSize,
    WASize,
    WASetSize,
    plan,
  ]);

  const endSpan = useMemo(() => {
    let str = "알 수 없는 페이지입니다.";
    if (plan === pageParams.참가중) {
      if (
        !ParticipatingAppointment ||
        ParticipatingAppointment[0]?.length === 0
      ) {
        str = "참가 중인 약속이 없어요.";
      } else {
        if (PAIsValidating || !isPAReachingEnd)
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
      if (!WaitingAppointment || WaitingAppointment[0]?.length === 0) {
        str = "참가 대기 중인 약속이 없어요.";
      } else {
        if (WAIsValidating || !isWAReachingEnd)
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
    isPAReachingEnd,
    isWAReachingEnd,
    PAIsValidating,
    WAIsValidating,
    ParticipatingAppointment,
    WaitingAppointment,
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
            setPAReachingEnd(false);
            PAMutate([], { revalidate: true }).then().catch();
            navigate(`../plans/${pageParams.참가중}`);
          }}
          animate={plan === pageParams.참가중 ? "pushed" : ""}
        />
        <LayoutBtn
          text={"대기 중"}
          height={"38px"}
          onClick={(e) => {
            e.stopPropagation();
            setWAReachingEnd(false);
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
