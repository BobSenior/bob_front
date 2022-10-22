import styled from "@emotion/styled/macro";

export const PlansHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
  width: 100%;
  & div {
    height: 40px;
    font-size: 1.5em;
    background-color: ghostwhite;
  }
`;
export const PlansBody = styled.div`
  max-width: 700px;
`;

export const PlansWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
