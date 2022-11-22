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
const PromiseDetailsBox = lazy(() => import("../PostDetailsBox"));
import ArrowSvg from "../../assets/icons/caret-up-outline.svg";
import { AppointmentHeadDTO } from "../../types/db";
import HashTag from "../HashTag";
import MemberBtn from "../MemberBtn";
import dayjsAll from "../../utils/dayjsAll";

interface props {
  data: AppointmentHeadDTO;
}

const PostBox = ({ data }: props) => {
  const [showDetailsBox, setShowDetailsBox] = useState(false);
  console.log(data);
  const [toggleDetailsBox, setToggleDetailsBox] = useState(false);

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
            <span
              style={{ fontSize: "0.7em" }}
            >{`${data.currNum}/${data.totalNum}`}</span>
          </TopContext>
          <MiddleContext>
            <MemberBtn
              userIdx={1}
              nickName={data.writer.nickname}
              department={data.writer.department}
              schoolId={data.writer.schoolId}
            />
          </MiddleContext>
          <BottomContext>
            <BottomRightDiv>
              <span>대기자수: {data.waitingNum}</span>
              <span>{dayjsAll(data.writtenAt).fromNow}</span>
            </BottomRightDiv>
          </BottomContext>
        </PromiseContexts>
      </PromiseHead>
      <PromiseTail>
        <HashTagContainer>
          {data.tagHeads.map((content) => (
            <HashTag key={content} text={content} />
          ))}
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

export default PostBox;
