/** @jsxImportSource @emotion/react */
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { css } from "@emotion/react";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import { useNavigate } from "react-router-dom";

const ProfileMenu = css`
  position: absolute;
  z-index: 1025;
  top: 39px;
  right: 3px;
  display: flex;
  flex-direction: column;
  background-color: var(--basic-back-color);
  border-radius: 5px;
  & div {
    padding: 15px 30px;
  }
`;

const ListMenu = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: -70, x: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0, y: -70, x: 40 }}
      css={ProfileMenu}
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
    </motion.div>
  );
};

export default ListMenu;
