/** @jsxImportSource @emotion/react */
import React, {
  lazy,
  memo,
  useState,
  Suspense,
  useCallback,
  MouseEvent,
  useRef,
  useMemo,
} from "react";
import {
  PBox,
  PromiseContexts,
  PromiseHead,
  PromiseImg,
  PromiseTail,
  TopContext,
  MiddleContext,
  BottomContext,
  BottomRightDiv,
  BottomLeftDiv,
  HashTagContainer,
  ArrowDiv,
  SpanCSS,
} from "./style";
import { promiseInfo } from "../../types/db";
const PromiseDetailsBox = lazy(() => import("../PromiseDetailsBox"));

const p1: promiseInfo = {
  name: "라이언",
  ID: "22",
  title: "밥먹을 사람!",
  major: "소프트웨어학부",
  place: "흑석동",
  time: "10월 30일",
};

const PromiseBox = () => {
  const [toggleDetailsBox, setToggleDetailsBox] = useState(false);
  const detailBoxRef = useRef<HTMLDivElement>(null);

  const onClickBox = useCallback(() => {
    setToggleDetailsBox((prevState) => {
      return !prevState;
    });
  }, []);

  useMemo(() => {
    window.scrollTo(
      window.innerWidth,
      detailBoxRef.current?.offsetTop
        ? detailBoxRef.current?.offsetTop - 30
        : window.innerHeight
    );
  }, [toggleDetailsBox]);

  return (
    <PBox onClick={onClickBox}>
      <PromiseHead>
        <PromiseImg />
        <PromiseContexts>
          <TopContext>
            <span>{p1.title}</span>
            <span>2/4</span>
          </TopContext>
          <MiddleContext>
            <span>{p1.name}</span>
            <span css={SpanCSS}>{p1.major}</span>
            <span css={SpanCSS}>{p1.ID}</span>
          </MiddleContext>
          <BottomContext>
            <BottomLeftDiv>
              <span>{p1.place}</span>
              <span>{p1.time}</span>
            </BottomLeftDiv>
            <BottomRightDiv>
              <span>대기자수: 1</span>
              <span>작성일자</span>
            </BottomRightDiv>
          </BottomContext>
        </PromiseContexts>
      </PromiseHead>
      <PromiseTail ref={detailBoxRef}>
        <HashTagContainer>#123</HashTagContainer>
        <ArrowDiv />
      </PromiseTail>
      {toggleDetailsBox && (
        <Suspense fallback={<div>로딩....</div>}>
          <PromiseDetailsBox data={p1} />
        </Suspense>
      )}
    </PBox>
  );
};

export default memo(PromiseBox);
