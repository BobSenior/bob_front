/** @jsxImportSource @emotion/react */
import { PlansHeader } from "./style";
import { lazy } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import { css } from "@emotion/react";
const Participating = lazy(() => import("../../pages/Participating"));
const Waiting = lazy(() => import("../../pages/Waiting"));
const Plans = () => {
  const { id, plan } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <PlansHeader
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          gap: 0.8px;
          & div {
            height: 40px;
            font-size: 1.5em;
            background-color: ghostwhite;
          }
        `}
      >
        <LayoutBtn
          text={"참가 중"}
          fontSize={"1em"}
          height={"100%"}
          width={"100%"}
          onClick={() => {
            navigate(`../plans/${id}/participating`);
          }}
          animate={plan === "participating" ? "pushed" : ""}
        />
        <LayoutBtn
          text={"대기 중"}
          fontSize={"1em"}
          height={"100%"}
          width={"100%"}
          onClick={() => {
            navigate(`../plans/${id}/waiting`);
          }}
          animate={plan === "waiting" ? "pushed" : ""}
        />
      </PlansHeader>
      <Routes>
        <Route path={"participating"} element={<Participating />} />
        <Route path={"waiting"} element={<Waiting />} />
        <Route path={"*"} element={<div>404error</div>} />
      </Routes>
    </>
  );
};

export default Plans;
