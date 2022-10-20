import styled from "@emotion/styled/macro";
import { css } from "@emotion/react";

export const HeaderSection = css`
  & div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    & span {
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
    font-size: 1.2em;
  }

  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;
export const Footer = styled.div`
  display: flex;
`;
