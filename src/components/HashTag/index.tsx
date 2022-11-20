/** @jsxImportSource @emotion/react */
import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { css } from "@emotion/react";

interface props {
  text: string;
  unClickable?: boolean;
}

const HashTag = ({ text, unClickable }: props) => {
  return (
    <NavLink
      to={`/main/search/${text}`}
      css={css`
        cursor: ${unClickable ? "default" : "pointer"};
        background-color: rgba(128, 128, 128, 0.2);
        padding: 2px 4px;
        text-decoration: none;
        color: black;
      `}
      end={true}
    >
      #{text}
    </NavLink>
  );
};

export default memo(HashTag);
