import React, { Dispatch, memo, SetStateAction } from "react";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import { useNavigate } from "react-router-dom";
import { ListModalContainer } from "../AlarmList/style";

interface Props {
  setShow: Dispatch<SetStateAction<number>>;
}

const MenuList = ({ setShow }: Props) => {
  const navigate = useNavigate();

  return (
    <ListModalContainer
      initial={{ opacity: 0, scale: 0, y: -70, x: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0, y: -70, x: 40 }}
    >
      <LayoutBtn
        text={"새 약속 만들기"}
        fontSize={"1em"}
        onClick={() => {
          setShow(0);
          navigate("../main/compose");
        }}
      />
      <LayoutBtn
        text={"프로필 수정"}
        fontSize={"1em"}
        onClick={() => {
          setShow(0);
          navigate("../main/profile/me");
        }}
      />
      <LayoutBtn text={"로그아웃"} fontSize={"1em"} onClick={() => {}} />
    </ListModalContainer>
  );
};

export default memo(MenuList);
