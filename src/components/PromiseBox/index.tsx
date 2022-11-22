/** @jsxImportSource @emotion/react */
import React, { lazy, useState, useCallback, Suspense } from "react";
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
import {AppointmentHeadDTO, promiseInfo} from "../../types/db";
import HashTag from "../HashTag";
import MemberBtn from "../MemberBtn";
import dayjsAll from "../../utils/dayjsAll";

interface props {
  data: AppointmentHeadDTO;
}

const PromiseBox = ({ data }: props) => {
  console.log(data);
  const [toggleDetailsBox, setToggleDetailsBox] = useState(false);

  const onClickPBox = useCallback(() => {
    if (data) setToggleDetailsBox((prevState) => !prevState);
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
                <span style={{ fontSize: "0.7em" }}>{`${data.currNum}/${data.totalNum}`}</span>
              </TopContext>
              <MiddleContext>
                <MemberBtn name={data.writer.nickname} major={data.writer.department} ID={data.writer.schoolId} />
              </MiddleContext>
              <BottomContext>
                <BottomRightDiv>
                  <span>대기자수: {data.waitingNum}</span>
                  <span>{dayjsAll(data.writtenAt).fromNow}</span>
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
              {data.tagHeads.map((content)=>(<HashTag key={content} text = {content}/>))}
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
              barColor="var(--basic-color)"
            />
          }
        >
          <PromiseDetailsBox data={data} />
        </Suspense>
      )}
    </PBox>
  );
};

export default PromiseBox;
