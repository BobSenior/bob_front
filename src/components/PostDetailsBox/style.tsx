import styled from "@emotion/styled/macro";
import { css } from "@emotion/react";
import { motion } from "framer-motion";

export const InNOut = {
  In: {
    backgroundColor: "rgb(114,141,208)",
  },
  Out: {},
};

export const MembersColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
  & h4 {
    margin: 3px 0;
  }
`;

export const MembersDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  row-gap: 8px;
  column-gap: 3px;
`;

export const PlaceInfoDiv = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: rgba(255, 255, 255, 30%);
  border-radius: 7px;
  cursor: pointer;
`;

export const TimeInfoDiv = styled.div`
  background-color: rgba(255, 255, 255, 30%);
  border-radius: 7px;
`;

export const PickerImg = styled.img`
  height: 2em;
  width: 1.5em;
`;

export const TitleHeader = css`
  border-radius: 6px;
  font-size: 0.65em;
`;

export const TNPSection = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-around;
  background-color: rgba(200, 200, 200, 0.7);
  border-radius: 5px;
  padding: 5px 10px;
`;

export const HeaderSection = css`
  & div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    & span {
      padding: 0 5px;
      display: block;
    }
  }
`;

export const ContentSection = css`
  padding: 0 10px;
  & p {
    width: 100%;
    border: 1px solid lightslategrey;
    border-radius: 5px;
    align-self: flex-start;
    font-size: 0.9em;
    word-break: break-word;
  }
`;

export const Section = styled.section`
  & h1 {
    border-bottom: rgb(200, 200, 200) ridge 1px;
    font-size: 0.8em;
  }
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding-top: 7px;
`;

export const Footer = styled.div`
  display: flex;
`;

export const DetailWrapper = styled.div``;
