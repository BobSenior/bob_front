import { motion } from "framer-motion";
import React, { ReactNode, useEffect, Dispatch, memo } from "react";
import styled from "@emotion/styled/macro";
import { createPortal } from "react-dom";

const ModalBackGround = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
`;

const ModalContainer = styled(motion.div)`
  display: inline-block;
  background: white;
  --saf-0: rgba(29, 28, 29, 0.13);
  box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  background: rgba(248, 248, 248, 1);
  border-radius: 6px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  max-width: 700px;
  max-height: 80vh;
  padding: 35px 15px 20px 15px;
  position: relative;
`;

const ModalCloseBtn = styled(motion.button)`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 25px;
  cursor: pointer;
`;

interface Props {
  children: ReactNode;
  setShow: Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, setShow }: Props) => {
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return createPortal(
    <ModalBackGround>
      <ModalContainer
        initial={{ opacity: 0, scale: 0.5, y: 500 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 500 }}
      >
        <ModalCloseBtn
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => setShow(false)}
        >
          &times;
        </ModalCloseBtn>
        {children}
      </ModalContainer>
    </ModalBackGround>,
    document.getElementById("modal") as HTMLElement
  );
};

export default memo(Modal);
