import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";
import TextAreaAutosize from "react-textarea-autosize";

export const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
export const HandleVariant = {
  on: {
    backgroundColor: "#23a1bd",
  },
  off: {
    backgroundColor: "rgba(75,75,75,0.7)",
  },
};
export const SwitchVariant = {
  on: {
    backgroundColor: "rgba(182, 209, 215, 0.4)",
  },
  off: {
    backgroundColor: "rgba(120, 120, 120, 0.4)",
  },
};
export const SpanVariant = {
  on: {
    color: "#23a1bd",
  },
  off: {
    color: "#808080FF",
  },
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
`;

export const SubmitButton = styled(motion.button)`
  height: 50px;
  margin-top: 50px;
  cursor: pointer;
  font: large bold;
  border-radius: 15px;
`;

export const Label = styled.label`
  padding-top: 50px;
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
  border-bottom: 1px solid black;
  width: 100%;
  :focus {
    outline: none;
    background-color: rgba(255, 255, 255, 100);
  }
`;
