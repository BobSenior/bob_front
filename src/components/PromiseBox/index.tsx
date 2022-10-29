/** @jsxImportSource @emotion/react */
import React, {
  MouseEvent,
  lazy,
  memo,
  useState,
  useCallback,
  Suspense,
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
  HashTagContainer,
  ArrowImg,
  variants,
} from "./style";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ProgressBar } from "react-loader-spinner";
const PromiseDetailsBox = lazy(() => import("../PromiseDetailsBox"));
import ArrowSvg from "../../assets/icons/caret-up-outline.svg";
import { promiseInfo } from "../../types/db";
import HashTag from "../HashTag";
import MemberBtn from "../MemberBtn";

interface props {
  data: promiseInfo;
}

const PromiseBox = ({ data }: props) => {
  const [toggleDetailsBox, setToggleDetailsBox] = useState(false);

  const onClickPBox = useCallback(() => {
    if (data) setToggleDetailsBox((prevState) => !prevState);
  }, []);
  const onClickMemberSpanBtn = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <PBox onClick={onClickPBox}>
      <PromiseHead>
        <PromiseImg />
        <PromiseContexts>
          {!data ? (
            <Skeleton count={3} width={"100%"} height={"1.4em"} />
          ) : (
            <>
              <TopContext>
                <span>{data.title}</span>
                <span style={{ fontSize: "0.7em" }}>{`2/4`}</span>
              </TopContext>
              <MiddleContext>
                <MemberBtn name={data.name} major={data.major} ID={data.ID} />
              </MiddleContext>
              <BottomContext>
                <BottomRightDiv>
                  <span>대기자수: 1</span>
                  <span>작성일자</span>
                </BottomRightDiv>
              </BottomContext>
            </>
          )}
        </PromiseContexts>
      </PromiseHead>
      <PromiseTail>
        <HashTagContainer>
          {!data ? (
            <Skeleton width={"5em"} height={"1.2em"} count={3} inline={true} />
          ) : (
            <>
              <HashTag text={"흑석역"} />
              <HashTag text={"흑석역"} />
              <HashTag text={"흑석역"} />
              <HashTag text={"흑석역"} />
              <HashTag text={"흑석역"} />
              <HashTag text={"흑석역"} />
              <HashTag text={"흑석역"} />
              <HashTag text={"흑석역"} />
              <HashTag text={"흑석역"} />
            </>
          )}
        </HashTagContainer>
        <ArrowImg
          src={ArrowSvg}
          variants={variants}
          animate={toggleDetailsBox ? "rollDown" : "rollUp"}
        />
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
