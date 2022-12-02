import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";

export const MajorSpan = styled.span`
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
