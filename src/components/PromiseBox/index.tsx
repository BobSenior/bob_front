/** @jsxImportSource @emotion/react */
import React, {
  lazy,
  memo,
  useState,
  useCallback,
  Suspense,
  useRef,
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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ProgressBar } from "react-loader-spinner";
import { css } from "@emotion/react";

interface props {
  data: promiseInfo;
  isLoading: boolean;
}

const PromiseBox = ({ data, isLoading }: props) => {
  const [toggleDetailsBox, setToggleDetailsBox] = useState(false);

  const detailBoxRef = useRef<HTMLDivElement>(null);

  const onClickBox = useCallback(() => {
    setToggleDetailsBox((prevState) => {
      if (!prevState) {
        window.scrollTo(
          window.innerWidth,
          detailBoxRef.current?.offsetTop
            ? detailBoxRef.current?.offsetTop - 30
            : window.innerHeight
        );
      }
      return !prevState;
    });
  }, []);

  return (
    <PBox onClick={onClickBox}>
      <PromiseHead>
        <PromiseImg />
        <PromiseContexts>
          {isLoading ? (
            <Skeleton count={3} width={"100%"} height={"1.4em"} />
          ) : (
            <>
              <TopContext>
                <span>{data.title}</span>
                <span>{`2/4`}</span>
              </TopContext>
              <MiddleContext>
                <span>{data.name}</span>
                <span css={SpanCSS}>{data.major}</span>
                <span css={SpanCSS}>{data.ID}</span>
              </MiddleContext>
              <BottomContext>
                <BottomLeftDiv>
                  <span>{data.place}</span>
                  <span>{data.time}</span>
                </BottomLeftDiv>
                <BottomRightDiv>
                  <span>대기자수: 1</span>
                  <span>작성일자</span>
                </BottomRightDiv>
              </BottomContext>
            </>
          )}
        </PromiseContexts>
      </PromiseHead>
      <PromiseTail ref={detailBoxRef}>
        <HashTagContainer>
          {isLoading ? (
            <Skeleton width={"5em"} height={"1.2em"} count={3} inline={true} />
          ) : (
            <>
              <div>#저녁</div>
              <div>#김치</div>
              <div>#밥</div>
            </>
          )}
        </HashTagContainer>
        <ArrowDiv />
      </PromiseTail>
      {toggleDetailsBox && (
        <Suspense
          fallback={
            <ProgressBar
              height="80"
              width="80"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{
                width: "100%",
              }}
              wrapperClass="progress-bar-wrapper"
              borderColor=""
              barColor="#23a1bd"
            />
          }
        >
          <PromiseDetailsBox data={data} />
        </Suspense>
      )}
    </PBox>
  );
};

export default memo(PromiseBox);
