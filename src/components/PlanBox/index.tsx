/** @jsxImportSource @emotion/react */
import {
  BottomContext,
  MiddleContext,
  PBox,
  PromiseContexts,
  PromiseHead,
  PromiseImg,
  PromiseTail,
  TopContext,
} from "../PromiseBox/style";
import {AppointmentHeadDTO, promiseInfo} from "../../types/db";
import React, { memo } from "react";
import MemberBtn from "../MemberBtn";
import { css } from "@emotion/react";

const TailCSS = css`
  & span {
    font-size: 0.75em;
  }
  & div {
    display: flex;
    align-items: center;
  }
  &div {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    border: 1px solid #9b9b9b;
    padding: 3px;
  }
`;

interface props {
  data: AppointmentHeadDTO;
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
            <MemberBtn name={data.writer.nickname} major={data.writer.department} ID={data.writer.schoolId} />
          </MiddleContext>
          <BottomContext></BottomContext>
        </PromiseContexts>
      </PromiseHead>
      <PromiseTail css={TailCSS}>
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
      </PromiseTail>
    </PBox>
  );
};

export default memo(PlanBox);
