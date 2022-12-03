/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";
import TextAreaAutosize from "react-textarea-autosize";
import { css } from "@emotion/react";

export const HandleVariant = {
  on: {
    backgroundColor: "var(--basic-color)",
    color: "rgba(255,255,255,1)",
  },
  off: {
    backgroundColor: "rgba(75,75,75,0.7)",
    color: "rgba(0,0,0,1)",
  },
};
export const SwitchVariant = {
  on: {
    backgroundColor: "rgba(182, 209, 215, 0.3)",
  },
  off: {
    backgroundColor: "rgba(120, 120, 120, 0.3)",
  },
};
export const SpanVariant = {
  on: {
    color: "var(--basic-color)",
  },
  off: {
    color: "#808080FF",
  },
};
export const LAM_Variant = {
  on: {
    border: "2px solid var(--bold-color)",
  },
  off: { color: "rgb(100,100,100)" },
};

export const ComposeMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ComposeForm = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 55%;
`;

export const ComposeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 38px;
`;

export const SwitchDiv = styled(motion.div)`
  width: 40px;
  height: 25px;
  display: flex;
  justify-content: ${(props) => {
    return props.id === "on" ? "flex-start" : "flex-end";
  }};
  border-radius: 12.5px;
  padding: 2.5px;
  align-items: center;
  cursor: pointer;
  align-self: flex-end;
`;

export const Handle = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
`;

export const Label = styled.label`
  padding: 50px 0 5px;
  & span {
    font-size: 0.9em;
    color: rgba(255, 0, 0, 0.7);
  }
`;

export const SwitchSpan = styled(motion.span)`
  padding: 0 10px;
  font-size: 0.8em;
`;

export const MainSpan = styled(motion.span)`
  width: 70%;
`;

export const TextArea = styled(TextAreaAutosize)`
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #000000;
  width: 100%;
  resize: none;

  :focus {
    outline: none;
    background-color: rgba(255, 255, 255, 100);
  }
`;

export const RadioBox = styled(motion.div)`
  padding: 3px 5px;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
`;

export const TypeRadioWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 5px;
  margin: 0 5px;
`;
export const RadioDetailsBox = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  padding-top: 15px;
  color: grey;

  & span {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid rgba(160, 160, 160, 0.5);
    border-radius: 12px;
    font-size: 0.85em;
  }
`;

export const LAMButton = styled(motion.div)`
  border-radius: 3px;
  width: 60%;
  display: flex;
  flex-direction: column;
  background-color: navajowhite;
  align-items: center;
  justify-content: center;
  height: fit-content;
  cursor: pointer;
  border: 0.5px solid #000000;
  padding: 3px;
`;

export const ResultSpan = styled.span`
  font-size: 0.95em;
  display: table-cell;
  text-align: center;
  text-align: -moz-center;
  text-align: -webkit-center;
  vertical-align: middle;
  margin-top: 2px;
`;

export const LAMDetailsSpan = styled.span`
  font-size: xx-small;
  color: grey;
  margin-top: 5px;
`;
