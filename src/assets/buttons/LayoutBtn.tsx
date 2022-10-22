/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import { MouseEvent } from "react";

interface props {
  text: string;
  fontSize: string;
  height: string;
  width: string;
  onClick: (e: MouseEvent<HTMLElement>) => void;
  animate: string;
}

const pushedVariants = {
  pushed: {
    backgroundColor: "#23a1bd",
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
    <motion.div
      css={css`
        height: ${height};
        width: ${width};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        cursor: default;
      `}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05, backgroundColor: "#23a1bd", color: "white" }}
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
    </motion.div>
  );
};

export default LayoutBtn;
