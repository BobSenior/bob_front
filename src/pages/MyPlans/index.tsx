/** @jsxImportSource @emotion/react */
import { PlansHeader, PlansWrapper } from "./style";
import { Button } from "../../layouts/Main/style";
import { lazy } from "react";
import { PromisesList } from "../Promises/style";
import Loading from "../Loading";
const PlanBox = lazy(() => import("../../components/PlanBox"));

const MyPlans = () => {
  return (
    <PlansWrapper>
      <PlansHeader>
        <Button>내 약속</Button>
        <Button>대기중인 약속</Button>
      </PlansHeader>
      <PromisesList>
        <PlanBox />
        <PlanBox />
        <PlanBox />
        <PlanBox />
      </PromisesList>
    </PlansWrapper>
  );
};

export default MyPlans;
