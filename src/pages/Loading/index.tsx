/** @jsxImportSource @emotion/react */
import { ColorRing } from "react-loader-spinner";
import React from "react";
import { css } from "@emotion/react";

const Loading = () => {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: ${window.innerHeight}px;
        justify-content: center;
        align-items: center;
      `}
    >
      <ColorRing
        visible={true}
        height="180"
        width="180"
        ariaLabel="blocks-loading"
        wrapperStyle={{ display: "block" }}
        wrapperClass="blocks-wrapper"
        colors={["#1b1fc7", "#1256bb", "#3876af", "#23a1bd", "#23a1bd"]}
      />
    </div>
  );
};

export default Loading;
