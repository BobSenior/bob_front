/** @jsxImportSource @emotion/react */
import { MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import ColorHash from "color-hash";

interface props {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  coloringText?: string;
}

const HashColoredSpanBtn = ({ children, onClick, coloringText }: props) => {
  const labelColor = new ColorHash().rgb(coloringText ? coloringText : "");
  return (
    <motion.span
      onClick={onClick}
      css={css`
        background-color: rgba(
          ${coloringText ? labelColor.at(0) : 0},
          ${coloringText ? labelColor.at(1) : 0},
          ${coloringText ? labelColor.at(2) : 0},
          0.2
        );
        border-radius: 3px;
        font-size: 0.9em;
        cursor: pointer;
        padding: 1.5px 3px;
        user-select: none;
      `}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.span>
  );
};
export default HashColoredSpanBtn;
