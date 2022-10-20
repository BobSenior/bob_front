import React from "react";
import {
  PBox,
  PromiseContexts,
  PromiseHead,
  PromiseImg,
  PromiseTail,
  TopContext,
  MiddleContext,
  BottomContext,
  SpanFont,
} from "./style";
import { css } from "@emotion/react";

const userInfo = {
  name: "라이언",
  ID: "22",
  title: "밥먹을 사람!",
  major: "소프트웨어학부",
  place: "흑석동",
  time: "10월 30일",
};

const PromiseBox = () => {
  return (
    <PBox>
      <PromiseHead>
        <PromiseImg />
        <PromiseContexts>
          <TopContext>
            <span style={{ fontSize: "0.3em" }}>제목: </span>
            <span>{userInfo.title}</span>
            <span css={SpanFont}>2/4</span>
          </TopContext>
          <MiddleContext>
            <span style={{ fontSize: "0.3em" }}>글쓴이: </span>
            <span>{userInfo.name}</span>
            <span style={{ fontSize: "0.5em" }}>{userInfo.major}</span>
            <span style={{ fontSize: "0.5em" }}>{userInfo.ID}</span>
          </MiddleContext>
          <BottomContext>
            <span>{userInfo.place}</span>
            <span>{userInfo.time}</span>
          </BottomContext>
        </PromiseContexts>
      </PromiseHead>
      <PromiseTail>
        <div>!@#</div>
        <div>12</div>
      </PromiseTail>
    </PBox>
  );
};

export default PromiseBox;
