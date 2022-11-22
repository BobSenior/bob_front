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

interface props {
  data: AppointmentHeadDTO;
}

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
              fill="var(--basic-color)"
            />
          </svg>
          <span>모집 중</span>
        </div>
        <div>
          <svg width="20" height="20">
            <circle
              cx="10"
              cy="10"
              r="7"
              stroke="black"
              strokeWidth="2"
              fill="var(--basic-color)"
            />
          </svg>
          <span>약속 잡는 중</span>
        </div>
        <div>
          <svg width="20" height="20">
            <circle
              cx="10"
              cy="10"
              r="7"
              stroke="black"
              strokeWidth="2"
              fill="var(--basic-color)"
            />
          </svg>
          <span>약속 완료</span>
        </div>
      </PlanTail>
    </PBox>
  );
};

export default AppointmentBox;
