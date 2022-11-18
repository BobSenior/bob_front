/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import { MouseEvent } from "react";

interface props {
  text: string;
  fontSize?: string;
  height?: string;
  width?: string;
  onClick: (e: MouseEvent<HTMLElement>) => void;
  animate?: string;
}

const pushedVariants = {
  pushed: {
    backgroundColor: "var(--basic-color)",
  },
};

const LayoutBtn = ({
  text,
  fontSize,
  height,
  width,
  onClick,
  animate,
}: props) => {
  return (
    <motion.button
      css={css`
        height: ${height ?? "100%"};
        width: ${width ?? "100%"};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        cursor: default;
        border: none;
        background-color: rgba(0, 0, 0, 0);
        font-size: large;
      `}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{
        backgroundColor: "var(--basic-color)",
        color: "#ffffff",
      }}
      animate={animate}
      variants={pushedVariants}
    >
      <span
        style={{
          fontSize: fontSize,
        }}
      >
        {text}
      </span>
    </motion.button>
  );
};

export default LayoutBtn;
