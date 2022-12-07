import React, { useState, useCallback, MouseEvent, memo } from "react";
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
  BottomLeftDiv,
} from "./style";
import PromiseDetailsBox from "../PostDetailsBox";
import ArrowSvg from "../../assets/icons/caret-up-outline.svg";
import { AppointmentHeadDTO } from "../../types/db";
import HashTag from "../HashTag";
import MemberBtn from "../MemberBtn";
import dayjsAll from "../../utils/dayjsAll";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";

interface props {
  data: AppointmentHeadDTO;
}

const PostBox = ({ data }: props) => {
  const [toggleDetailsBox, setToggleDetailsBox] = useState(false);

  const onClickShowDetails = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setToggleDetailsBox((prevState) => !prevState);
  }, []);

  return (
    <PBox onClick={onClickShowDetails}>
      <PromiseHead>
        <PromiseImg />
        <PromiseContexts>
          <TopContext>
            <span>{data.title}</span>
            <span
              style={{ fontSize: "xx-small" }}
            >{`${data.currNum}/${data.totalNum}`}</span>
          </TopContext>
          <MiddleContext>
            <MemberBtn
              userIdx={data.writer.userIdx}
              nickName={data.writer.nickname}
              department={data.writer.department}
              schoolId={data.writer.schoolId}
            />
          </MiddleContext>
          <BottomContext>
          <BottomLeftDiv>
          </BottomLeftDiv>
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
            <HashTag key={generateUniqueID()} text={content} />
          ))}
        </HashTagContainer>
        <ArrowImg
          src={ArrowSvg}
          variants={variants}
          animate={toggleDetailsBox ? "rollDown" : "rollUp"}
        />
      </PromiseTail>
      {toggleDetailsBox && (
        <PromiseDetailsBox postIdx={data.postIdx} type={data.type} />
      )}
    </PBox>
  );
};

export default memo(PostBox);
