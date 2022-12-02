
import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";
import TextAreaAutosize from "react-textarea-autosize";



export const Top = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-around;
  top:40px;
  bottom: 0;
  width: 80%;
  left:10%;
  height: 60px;
  z-index: 100;
  background-color: white;
  & div {
    width: 100%;
  }
`;

export const CommitButton = styled.button`
  background-color: #23a1bd;
  color: white;
  border-radius: 5px;
  border-color:#23a1bd;
  margin-bottom: 10px;
  width:100px;
  height:30px;
  font-size: 18px;
  justify-content: space-around;
`;