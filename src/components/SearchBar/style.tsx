import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";

export const Input = styled(motion.input)`
  width: 150px;
  font-size: 1.1em;
  border: none;
  border-bottom: 1px solid black;
  background-color: rgba(0, 0, 0, 0);
  :focus {
    outline: none;
    background-color: rgba(255, 255, 255);
  }
`;

export const ResultSpan = styled.span`
  font-size: 1.1em;
  color: grey;
  border-bottom: 1px solid gray;
`;

export const SearchWrapper = styled(motion.div)`
  display: flex;
`;
