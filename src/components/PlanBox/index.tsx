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
import { promiseInfo } from "../../types/db";
import React, { memo } from "react";
import MemberBtn from "../MemberBtn";

interface props {
  data: promiseInfo;
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
            <MemberBtn name={data.name} major={data.major} ID={data.ID} />
          </MiddleContext>
          <BottomContext></BottomContext>
        </PromiseContexts>
      </PromiseHead>
      <PromiseTail></PromiseTail>
    </PBox>
  );
};

export default memo(PlanBox);
