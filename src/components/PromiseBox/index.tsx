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
  ArrowImg,
  variants,
} from "./style";
import { promiseInfo } from "../../types/db";
const PromiseDetailsBox = lazy(() => import("../PromiseDetailsBox"));
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ProgressBar } from "react-loader-spinner";
import ArrowSvg from "../../assets/icons/caret-up-outline.svg";
import MemberSpanBtn from "../../assets/buttons/MemberSpanBtn";

interface props {
  data: promiseInfo;
  isLoading: boolean;
}

const PromiseBox = ({ data, isLoading }: props) => {
  const [toggleDetailsBox, setToggleDetailsBox] = useState(false);
  const detailBoxRef = useRef<HTMLDivElement>(null);

  const onClickBox = useCallback(() => {
    setToggleDetailsBox((prevState) => {
      //닫혀있을 때 클릭 시 스크롤 업.
      // if (!prevState) {
      //   window.scrollTo(
      //     window.innerWidth,
      //     detailBoxRef.current?.offsetTop
      //       ? detailBoxRef.current?.offsetTop - 30
      //       : window.innerHeight
      //   );
      // }
      return !prevState;
    });
  }, []);
  const onClickMemberSpanBtn = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  return (
    <PBox
      onClick={onClickBox}
      whileHover={{ scale: 1.075, backgroundColor: "#ffffff" }}
    >
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
                <MemberSpanBtn
                  onClick={onClickMemberSpanBtn}
                  major={data.major}
                >
                  {data.name}
                  <span>{data.major}</span>
                  <span>{data.ID}</span>
                </MemberSpanBtn>
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
