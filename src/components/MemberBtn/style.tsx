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
  position: absolute;
  z-index: 500;
  gap: 0;
`;

export const MemberInfoDiv = styled.div`
  position: relative;
  top: -5px;
  background-color: var(--basic-back-color);
  width: 250px;
  display: flex;
  border-radius: 10px;
  padding: 10px 10px;
  column-gap: 5px;
`;
