import {
  BottomContext,
  MiddleContext,
  PBox,
  PlanTail,
  PromiseContexts,
  PromiseHead,
  PromiseImg,
  TopContext,
} from "../PostBox/style";
import { AppointmentHeadDTO } from "../../types/db";
import React from "react";
import MemberBtn from "../MemberBtn";
import ColoredBtn from "../../assets/buttons/ColoredBtn";
import EnterSvg from "../../assets/icons/enter-outline.svg";
import { NavLink } from "react-router-dom";

interface props {
  data: AppointmentHeadDTO;
}

const statusMatcher = {
  모집중: "active",
  약속잡는중: "",
  만남대기중: "",
};

const AppointmentBox = ({ data }: props) => {
  return (
    <PBox>
      <PromiseHead>
        <PromiseImg />
        <PromiseContexts>
          <TopContext>
            <span>{data.title}</span>
          </TopContext>
          <MiddleContext>
            <MemberBtn
              userIdx={data.writer.userIdx}
              nickName={data.writer.nickname}
              department={data.writer.department}
              schoolId={data.writer.schoolId}
            />
          </MiddleContext>
          <BottomContext></BottomContext>
        </PromiseContexts>
        <NavLink
          to={`/main/promise/${data.postIdx}`}
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
            모집 중
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
            약속 정하는 중
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
            약속
          </span>
        </div>
      </PlanTail>
    </PBox>
  );
};

export default AppointmentBox;
