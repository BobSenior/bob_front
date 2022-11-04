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
  background-color: red;
`;

export const MemberInfoDiv = styled(motion.div)`
  position: absolute;
  z-index: 500;
  background-color: rgba(182, 209, 215, 0.8);
  width: 250px;
  height: 50px;
  display: flex;
  border-radius: 10px;
  padding: 10px 10px;
`;
