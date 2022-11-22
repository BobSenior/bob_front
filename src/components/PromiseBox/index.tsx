import React, {
  lazy,
  useState,
  useCallback,
  Suspense,
  MouseEvent,
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
import { ProgressBar } from "react-loader-spinner";
const PromiseDetailsBox = lazy(() => import("../PromiseDetailsBox"));
import ArrowSvg from "../../assets/icons/caret-up-outline.svg";
import { promiseInfo } from "../../types/db";
import HashTag from "../HashTag";
import MemberBtn from "../MemberBtn";
import dayjsAll from "../../utils/dayjsAll";

interface props {
  data: promiseInfo;
}

const PromiseBox = ({ data }: props) => {
  const [showDetailsBox, setShowDetailsBox] = useState(false);

  const onClickShowDetails = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setShowDetailsBox((prevState) => !prevState);
    },
    [showDetailsBox]
  );

  return (
    <PBox onClick={onClickShowDetails}>
      <PromiseHead>
        <PromiseImg />
        <PromiseContexts>
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
              <span>{dayjsAll("2022-11-19 15:50:00").fromNow}</span>
            </BottomRightDiv>
          </BottomContext>
        </PromiseContexts>
      </PromiseHead>
      <PromiseTail>
        <HashTagContainer>
          <HashTag text={"흑석역"} />
          <HashTag text={"흑석역"} />
          <HashTag text={"흑석역"} />
          <HashTag text={"흑석역"} />
          <HashTag text={"흑석역"} />
          <HashTag text={"흑석역"} />
          <HashTag text={"흑석역"} />
          <HashTag text={"흑석역"} />
          <HashTag text={"흑석역"} />
          <HashTag text={"흑석역"} />
          <HashTag text={"흑석역"} />
          <HashTag text={"흑석역"} />
          <HashTag text={"흑석역"} />
        </HashTagContainer>
        <ArrowImg
          src={ArrowSvg}
          variants={variants}
          animate={showDetailsBox ? "rollDown" : "rollUp"}
        />
      </PromiseTail>
      {showDetailsBox && (
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
