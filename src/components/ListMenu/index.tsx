/** @jsxImportSource @emotion/react */
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { css } from "@emotion/react";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import { useNavigate } from "react-router-dom";

interface props {
  isVisible: boolean;
}

const ProfileMenu = css`
  position: absolute;
  top: 39px;
  right: 3px;
  display: flex;
  flex-direction: column;
  background-color: #b6d1d7;
  border-radius: 5px;
  z-index: 1025;
  & div {
    padding: 15px 30px;
  }
`;

const ListMenu = ({ isVisible }: props) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
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
      )}
    </AnimatePresence>
  );
};

export default ListMenu;
