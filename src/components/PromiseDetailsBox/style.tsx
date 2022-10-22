import styled from "@emotion/styled/macro";
import { css } from "@emotion/react";
import { motion } from "framer-motion";

export const InNOut = {
  In: {
    backgroundColor: "rgb(114,141,208)",
  },
  Out: {},
};

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
`;

export const TimeInfoDiv = styled.div`
  background-color: rgba(255, 255, 255, 30%);
  border-radius: 7px;
`;

export const MapButton = styled.img`
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
    align-self: flex-start;
    font-size: 0.9em;
    word-break: break-word;
  }
`;
export const TagSection = css``;

export const Section = styled.section`
  & h1 {
    border-bottom: rgb(200, 200, 200) ridge 1px;
    font-size: 0.8em;
  }
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;
export const Footer = styled.div`
  display: flex;
`;
