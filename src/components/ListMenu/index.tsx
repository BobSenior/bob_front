import React from "react";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import { useNavigate } from "react-router-dom";
import { LisModalContainer } from "../ListAlarm/style";

const ListMenu = () => {
  const navigate = useNavigate();

  return (
    <LisModalContainer
      initial={{ opacity: 0, scale: 0, y: -70, x: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0, y: -70, x: 40 }}
    >
      <LayoutBtn
        text={"새 약속 만들기"}
        fontSize={"1em"}
        onClick={() => {
          navigate("../main/compose");
        }}
      />
      <LayoutBtn
        text={"프로필 수정"}
        fontSize={"1em"}
        onClick={() => {
          navigate("../main/profile");
        }}
      />
      <LayoutBtn text={"로그아웃"} fontSize={"1em"} onClick={() => {}} />
    </LisModalContainer>
  );
};

export default ListMenu;
