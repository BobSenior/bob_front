/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { MouseEvent, ReactNode } from "react";
import { css } from "@emotion/react";

interface props {
  children: ReactNode;
  width: string;
  height: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  animate?: string;
  variants?: any;
  isHover?: boolean;
  isTap?: boolean;
}

const ColoredBtn = ({
  children,
  width,
  height,
  onClick,
  animate,
  variants,
  isHover,
  isTap,
}: props) => {
  return (
    <motion.div
      css={css`
        display: flex;
        flex-direction: column;
        width: ${width};
        height: ${height};
        background-color: var(--basic-color);
        color: white;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      `}
      onClick={onClick}
      whileHover={isHover ? { scale: 1.05 } : undefined}
      whileTap={
        isTap ? { scale: 0.9, backgroundColor: "var(--bold-color)" } : undefined
      }
      animate={animate}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ColoredBtn;
