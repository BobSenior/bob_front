import styled from "@emotion/styled/macro";
import { css } from "@emotion/react";

export const PlaceInfoDiv = styled.div`
  justify-items: center;
`;
export const TimeInfoDiv = styled.div``;

export const PushedButton = css`
  background-color: slategrey;
`;

export const TitleHeader = css`
  border-radius: 6px;
  font-size: 0.65em;
`;
export const TNPSection = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #b6d1d7;
  border-radius: 5px;
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
export const MemberSection = css``;
export const ContentSection = css``;
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
