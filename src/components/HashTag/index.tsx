/** @jsxImportSource @emotion/react */
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";

interface props {
  text: string;
  unClickable?: boolean;
}

const HashTag = ({ text, unClickable }: props) => {
  const navigate = useNavigate();
  return (
    <span
      onClick={
        unClickable
          ? undefined
          : (e) => {
              e.stopPropagation();
              navigate(`../main/search/${text}`);
            }
      }
      css={css`
        cursor: pointer;
        background-color: rgba(128, 128, 128, 0.2);
        padding: 2px 4px;
      `}
    >
      #{text}
    </span>
  );
};

export default HashTag;
