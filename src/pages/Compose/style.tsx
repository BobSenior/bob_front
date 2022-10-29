import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";

export const ComposeMain = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 50px 0;
`;

export const ComposeForm = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 55%;
  row-gap: 40px;
  & div {
    display: flex;
    flex-direction: column;
  }
`;

export const ComposeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ScrollProgressBar = styled(motion.div)`
  position: sticky;
  top: 38px;
  height: 10px;
  background: #23a1bd;
  transform-origin: 0;
`;
