/** @jsxImportSource @emotion/react */
import { motion, TapInfo } from "framer-motion";
import { CSSProperties, forwardRef, MouseEvent, ReactNode } from "react";
import { css } from "@emotion/react";

interface Props {
  children: ReactNode;
  width: string;
  height: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  animate?: string;
  variants?: any;
  useHover?: boolean;
  useTap?: boolean | null;
  disable?: boolean;
  type?: string;
  onTapStart?: (
    event: globalThis.MouseEvent | TouchEvent | PointerEvent,
    info: TapInfo
  ) => void;
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
  type,
  onTapStart,
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
      whileHover={useHover ? { scale: 1.02 } : undefined}
      whileTap={
        useTap
          ? { scale: 0.9, backgroundColor: "var(--bold-color)" }
          : undefined
      }
      onTapStart={onTapStart}
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
