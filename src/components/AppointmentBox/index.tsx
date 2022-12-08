import {
  MiddleContext,
  PBox,
  PlanTail,
  PromiseContexts,
  PromiseHead,
  PromiseImg,
  TopContext,
  UnreadChatSpan,
} from "../PostBox/style";
import { AppointmentHeadDTO } from "../../types/db";
import React, { useContext } from "react";
import MemberBtn from "../MemberBtn";
import ColoredBtn from "../../assets/buttons/ColoredBtn";
import EnterSvg from "../../assets/icons/enter-outline.svg";
import { NavLink } from "react-router-dom";
import useSWR from "swr";
import { getFetcher } from "../../utils/fetchers";

interface props {
  data: AppointmentHeadDTO;
}

const statusMatcher = {
  모집중: "active",
  약속잡는중: "finish",
  만남대기중: "fix",
};

const AppointmentBox = ({ data }: props) => {
  const myData = JSON.parse(sessionStorage.getItem("myData") ?? "");
  const {
    data: UnreadChatCount,
    mutate,
    error,
    isValidating,
  } = useSWR(
    `/chat/unread/${data.postIdx}?userIdx=${myData?.userIdx}`,
    getFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );

  return (
    <PBox>
      <PromiseHead>
        <PromiseContexts>
          <TopContext>
            <span>
              <span>[{data.type === "dutch" ? "같이먹자" : "사주세요"}]</span>
              {data.title}
            </span>
            {UnreadChatCount && (
              <UnreadChatSpan>{UnreadChatCount}</UnreadChatSpan>
            )}
          </TopContext>
          <MiddleContext>
            <MemberBtn
              uuid={data.writer.uuid}
              userIdx={data.writer.userIdx}
              nickName={data.writer.nickname}
              department={data.writer.department}
              schoolId={data.writer.schoolId}
            />
          </MiddleContext>
        </PromiseContexts>
        <NavLink
          to={`/main/appointment/${data.postIdx}`}
          style={{
            width: "30px",
            height: "100%",
          }}
          end={true}
        >
          <ColoredBtn width={"100%"} height={"100%"}>
            <img
              src={EnterSvg}
              width={"25px"}
              height={"25px"}
              alt={"enter-icon"}
            />
          </ColoredBtn>
        </NavLink>
      </PromiseHead>
      <PlanTail>
        <div>
          <svg width="20" height="20">
            <circle
              cx="10"
              cy="10"
              r="7"
              stroke="black"
              strokeWidth="2"
              fill={
                data.status === statusMatcher.모집중
                  ? "var(--basic-color)"
                  : "white"
              }
            />
          </svg>
          <span
            style={{
              color: data.status === statusMatcher.모집중 ? "black" : "grey",
            }}
          >
            모집하고 있어요
          </span>
        </div>
        <div>
          <svg width="20" height="20">
            <circle
              cx="10"
              cy="10"
              r="7"
              stroke="black"
              strokeWidth="2"
              fill={
                data.status === statusMatcher.약속잡는중
                  ? "var(--basic-color)"
                  : "white"
              }
            />
          </svg>
          <span
            style={{
              color:
                data.status === statusMatcher.약속잡는중 ? "black" : "grey",
            }}
          >
            약속을 정해요
          </span>
        </div>
        <div>
          <svg width="20" height="20">
            <circle
              cx="10"
              cy="10"
              r="7"
              stroke="black"
              strokeWidth="2"
              fill={
                data.status === statusMatcher.만남대기중
                  ? "var(--basic-color)"
                  : "white"
              }
            />
          </svg>
          <span
            style={{
              color:
                data.status === statusMatcher.만남대기중 ? "black" : "grey",
            }}
          >
            이제 만나요
          </span>
        </div>
      </PlanTail>
    </PBox>
  );
};

export default AppointmentBox;
