import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";

export const Header = styled.div`
  display: grid;
  max-height: 50px;
  grid-template-columns: 1fr;
  gap: 5px;
  height: 40px;
  max-width: inherit;
  margin-bottom: 5px;
`;

export const Wrapper = styled.div`
  width: 70vw;
  max-width: 300px;
  height: 50vh;
  display: flex;
  flex-direction: column;
`;

export const DepartmentBtn = styled(motion.button)`
  width: 100%;
  height: 25px;
  text-align: left;
  border: none;
  padding-left: 50px;
  cursor: pointer;
  margin: 3px 0;
  font-size: 0.95em;

  :disabled {
    padding-left: 3px;
    cursor: default;
    margin: 8px 0 0;
    font-size: 0.8em;
    color: black;
    border-left: 3px solid var(--basic-color);
  }
`;
