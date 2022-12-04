import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";
import TextAreaAutosize from "react-textarea-autosize";

export const ChatBoxContainer = styled.div`
  width: inherit;
  max-width: inherit;
  display: grid;
  grid-template-columns: 1fr;
  margin: 5px 0;
  box-shadow: 0px -2px 5px 1px rgba(0, 0, 0, 0.3);
`;

export const Form = styled.form`
  color: rgb(29, 28, 29);
  font-size: 1em;
  width: 100%;
  display: flex;
`;

export const ChatInputArea = styled(TextAreaAutosize)`
  font-size: 15px;
  padding: 8px 9px;
  resize: none;
  width: 100%;
  min-height: 30px;
`;

export const SendButton = styled(motion.button)`
  width: 50px;
`;
