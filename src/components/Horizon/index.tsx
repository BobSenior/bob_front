import React, { FC } from "react";

interface Props {
  text: String;
}

const HorizonLine: FC<Props> = ({ text }) => {
  return (
    <div
      style={{
        width: "90%",
        marginLeft: "5%",
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
