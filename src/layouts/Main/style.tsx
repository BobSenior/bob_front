import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";

export const MainBox = styled.div`
  display: flex;
  justify-content: center;
  & div {
    max-width: 1200px;
  }
`;

export const ProfileMenu = styled(motion.div)`
  position: absolute;
  top: 38px;
  right: 8px;
  display: flex;
  flex-direction: column;
  background-color: rgb(201, 221, 226, 50%);
  border-radius: 5px;
  & div {
    padding: 15px 30px;
  }
`;

export const ProfileImg = styled.img`
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 28px;
  top: 5.5px;
  right: 8px;
`;

export const Header = styled.div`
  background-color: rgba(182, 209, 215, 0.75);
  height: 38px;
  position: fixed;
  width: 100%;
  text-align: center;
  & span {
    font-size: 30px;
    cursor: default;
  }
  ${ProfileMenu}
`;

export const Body = styled.div`
  padding-top: 38px;
  padding-bottom: 35px;
  width: 100%;
`;

export const Bottom = styled.div`
  position: fixed;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  bottom: 0;
  width: 100%;
  height: 38px;
  background-color: rgba(182, 209, 215, 0.75);
`;
