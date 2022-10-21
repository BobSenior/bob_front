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

const PlanBox = () => {
  return (
    <PBox>
      <PromiseHead>
        <PromiseImg />
        <PromiseContexts>
          <TopContext></TopContext>
          <MiddleContext></MiddleContext>
          <BottomContext></BottomContext>
        </PromiseContexts>
      </PromiseHead>
      <PromiseTail></PromiseTail>
    </PBox>
  );
};

export default PlanBox;
