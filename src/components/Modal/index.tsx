/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { ReactNode, MouseEvent } from "react";
import { css } from "@emotion/react";

interface props {
  isVisible: boolean;
  children: ReactNode;
  onClickForClose?: (e: MouseEvent<HTMLElement>) => void;
}

const Modal = ({ isVisible, children, onClickForClose }: props) => {
  return (
    <>
      {isVisible && (
        <motion.div
          css={css`
            position: fixed;
            text-align: center;
            width: 100vw;
            left: 0;
            bottom: 0;
            top: 0;
            z-index: 1022;
            background-color: rgba(255, 255, 255, 0.5);
          `}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 500 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 500 }}
            css={css`
              margin-top: 20vh;
              display: inline-block;
              background: white;
              --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
              box-shadow: 0 0 0 1px var(--saf-0),
                0 4px 12px 0 rgba(0, 0, 0, 0.12);
              background: rgba(
                var(--sk_foreground_min_solid, 248, 248, 248),
                1
              );
              border-radius: 6px;
              user-select: none;
              width: 60vw;
              max-width: 650px;
              height: 50vh;
              padding: 35px 15px 20px 15px;
              position: relative;
            `}
          >
            <motion.button
              css={css`
                position: absolute;
                right: 10px;
                top: 6px;
                background: transparent;
                border: none;
                font-size: 25px;
                cursor: pointer;
              `}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={onClickForClose}
            >
              &times;
            </motion.button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
