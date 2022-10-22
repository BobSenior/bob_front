/** @jsxImportSource @emotion/react */
import { PlansHeader, PlansWrapper } from "./style";
import { lazy } from "react";
import { PromisesColumn, PromisesWrapper } from "../Promises/style";
import { useNavigate, useParams } from "react-router-dom";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
const PlanBox = lazy(() => import("../../components/PlanBox"));

const MyPlans = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  return (
    <PlansWrapper>
      <PlansHeader>
        <LayoutBtn
          text={"참가 중"}
          fontSize={"1em"}
          height={"100%"}
          width={"100%"}
          onClick={() => {
            navigate("../myplans/participate");
          }}
          animate={page === "participate" ? "pushed" : ""}
        />
        <LayoutBtn
          text={"대기 중"}
          fontSize={"1em"}
          height={"100%"}
          width={"100%"}
          onClick={() => {
            navigate("../myplans/waiting");
          }}
          animate={page === "waiting" ? "pushed" : ""}
        />
      </PlansHeader>
      <PromisesWrapper>
        {page === "waiting" && (
          <>
            <PromisesColumn>
              <PlanBox />
            </PromisesColumn>
          </>
        )}
      </PromisesWrapper>
    </PlansWrapper>
  );
};

export default MyPlans;
