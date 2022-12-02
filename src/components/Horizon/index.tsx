import React, { FC } from "react";

interface Props {
  text: String;
}

const HorizonLine: FC<Props> = ({ text }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        left: "5%",
        marginTop: "30px",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "10px 0 20px",
      }}
    >
      <span style={{ background: "#fff" }}></span>
    </div>
  );
};

export default HorizonLine;
