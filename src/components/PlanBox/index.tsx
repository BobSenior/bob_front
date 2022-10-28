/** @jsxImportSource @emotion/react */
import {
  BottomContext,
  BottomLeftDiv,
  MiddleContext,
  PBox,
  PromiseContexts,
  PromiseHead,
  PromiseImg,
  PromiseTail,
  TopContext,
} from "../PromiseBox/style";
import { promiseInfo } from "../../types/db";
import React, { memo, ReactNode } from "react";
import MemberSpanBtn from "../../assets/buttons/MemberSpanBtn";

const p1: promiseInfo = {
  name: "라이언",
  ID: "22",
  title: "밥먹을 사람!",
  major: "소프트웨어학부",
  place: "흑석동",
  time: "10월 30일",
};

const PlanBox = () => {
  return (
    <PBox>
      <PromiseHead>
        <PromiseImg />
        <PromiseContexts>
          <TopContext>
            <span>{p1.title}</span>
          </TopContext>
          <MiddleContext>
            <MemberSpanBtn onClick={() => {}} major={p1.major}>
              {p1.name}
              <span>{p1.major}</span>
              <span>{p1.ID}</span>
            </MemberSpanBtn>
          </MiddleContext>
          <BottomContext>
            <BottomLeftDiv>
              <span>{p1.place}</span>
              <span>{p1.time}</span>
            </BottomLeftDiv>
          </BottomContext>
        </PromiseContexts>
      </PromiseHead>
      <PromiseTail></PromiseTail>
    </PBox>
  );
};

export default memo(PlanBox);
