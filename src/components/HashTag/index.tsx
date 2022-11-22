/** @jsxImportSource @emotion/react */
import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { css } from "@emotion/react";

interface Props {
  text: string;
}

const HashTag = ({ text }: Props) => {
  return (
    <NavLink
      to={`/main/search/${text}`}
      css={css`
        cursor: pointer;
        background-color: rgba(128, 128, 128, 0.2);
        padding: 2px 4px;
        text-decoration: none;
        color: black;
      `}
      end={true}
      onClick={(e) => e.stopPropagation()}
    >
      #{text}
    </NavLink>
  );
};

export default memo(HashTag);
