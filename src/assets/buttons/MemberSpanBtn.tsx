/** @jsxImportSource @emotion/react */
import { MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import ColorHash from "color-hash";

interface props {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  major?: string;
}

const MemberSpanBtn = ({ children, onClick, major }: props) => {
  const labelColor = new ColorHash().rgb(major ? major : "");
  return (
    <motion.span
      onClick={onClick}
      css={css`
        background-color: rgba(
          ${major ? labelColor.at(0) : 0},
          ${major ? labelColor.at(1) : 0},
          ${major ? labelColor.at(2) : 0},
          0.2
        );
        border-radius: 3px;
        font-size: 0.9em;
        cursor: pointer;
        & span {
          font-size: 0.45em;
        }
      `}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.span>
  );
};
export default MemberSpanBtn;
