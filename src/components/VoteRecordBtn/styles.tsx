import styled from "@emotion/styled";

export const Progress = styled.div`
  width: 100%;
  height: 15px;
  background-color: gray;
  border-radius: 10px;
`;
export const Dealt = styled.div<{ dealt: number }>`
  border-radius: 115px;
  background-color: #23a1bd;
  width: ${(props) => props.dealt + "%"};
  height: 100%;
`;

import { motion } from "framer-motion";

export const VoteSpan = styled.span`
  padding-left: 300px;
  font-size: xx-small;
  color: rgb(50, 50, 50);
`;

export const ProfileScriptBox = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
`;

export const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: var(--basic-color);
`;

export const MemberInfoPopUp = styled(motion.div)`
  width: 250px;
  position: absolute;
  z-index: 500;
  gap: 0;
`;

export const MemberInfoDiv = styled(motion.div)`
  position: relative;
  top: -5px;
  background-color: var(--basic-back-color);
  display: grid;
  grid-template-columns: 50px 1fr 30px;
  align-items: center;
  border-radius: 10px;
  padding: 8px 5px;
  column-gap: 5px;
`;
