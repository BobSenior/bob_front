import {
  BottomContext,
  MiddleContext,
  PBox,
  PlanTail,
  PromiseContexts,
  PromiseHead,
  PromiseImg,
  TopContext,
} from "../PromiseBox/style";
import { promiseInfo } from "../../types/db";
import React, { memo } from "react";
import MemberBtn from "../MemberBtn";

interface props {
  data: promiseInfo;
}

const PlanBox = ({ data }: props) => {
  return (
    <PBox>
      <PromiseHead>
        <PromiseImg />
        <PromiseContexts>
          <TopContext>
            <span>{data.title}</span>
          </TopContext>
          <MiddleContext>
            <MemberBtn name={data.name} major={data.major} ID={data.ID} />
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
            Sorry, your browser does not support inline SVG.
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
            Sorry, your browser does not support inline SVG.
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
            Sorry, your browser does not support inline SVG.
          </svg>
          <span>약속 완료</span>
        </div>
      </PlanTail>
    </PBox>
  );
};

export default memo(PlanBox);
