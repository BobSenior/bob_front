import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";

export const LisModalContainer = styled(motion.div)`
  position: absolute;
  z-index: 1025;
  top: 39px;
  right: 3px;
  display: flex;
  flex-direction: column;
  background-color: var(--basic-back-color);
  border-radius: 5px;
  & button {
    padding: 15px 30px;
  }
`;
