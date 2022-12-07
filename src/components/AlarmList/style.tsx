import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";

export const NoAlarmDiv = styled.div`
  width: 100%;
  height: 50px;
  display: flex; 
  align-items: center;
  justify-content: center;
  & span {
    color: gray;
  }
`

export const AlarmListWrapper = styled.div`
  width: 250px;
  height: 350px;
  padding: 5px;
  display: flex;
`;

export const ListModalContainer = styled(motion.div)`
  position: absolute;
  z-index: 1025;
  top: 39px;
  right: 3px;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  border-radius: 5px;
  & button {
    padding: 15px 30px;
  }
`;
