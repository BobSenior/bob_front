/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { forwardRef, MouseEvent, ReactNode } from "react";
import { css } from "@emotion/react";

interface Props {
  children: ReactNode;
  width: string;
  height: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  animate?: string;
  variants?: any;
  useHover?: boolean;
  useTap?: boolean;
  disable?: boolean;
}

const ColoredBtn = ({
  children,
  width,
  height,
  onClick,
  animate,
  variants,
  useHover,
  useTap,
  disable,
}: Props) => {
  return (
    <motion.button
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
        border: none;
        font-size: 1em;
        :hover {
          cursor: pointer;
        }
      `}
      whileHover={useHover ? { scale: 1.05 } : undefined}
      whileTap={
        useTap
          ? { scale: 0.9, backgroundColor: "var(--bold-color)" }
          : undefined
      }
      animate={animate}
      variants={variants}
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </motion.button>
  );
};
export default ColoredBtn;
