import React, { Dispatch, memo, SetStateAction, useContext } from "react";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import { useNavigate } from "react-router-dom";
import { ListModalContainer } from "../AlarmList/style";
import MyProfileMenu from "../MyProfileMenu";
import GlobalContext from "../../hooks/GlobalContext";

interface Props {
  setShow: Dispatch<SetStateAction<number>>;
}

const MenuList = ({ setShow }: Props) => {
  const navigate = useNavigate();
  const { setMyData } = useContext(GlobalContext);

  return (
    <ListModalContainer
      initial={{ opacity: 0, scale: 0, y: -70, x: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0, y: -70, x: 40 }}
    >
      <MyProfileMenu />
      <LayoutBtn
        text={"새 약속 만들기"}
        fontSize={"1em"}
        onClick={() => {
          setShow(0);
          navigate("../main/compose");
        }}
      />
      <LayoutBtn
        text={"로그아웃"}
        fontSize={"1em"}
        onClick={() => {
          setMyData(undefined);
        }}
      />
    </ListModalContainer>
  );
};

export default memo(MenuList);
