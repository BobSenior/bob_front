import styled from "@emotion/styled/macro";

export const PlansHeader = styled.div`
  position: sticky;
  top: 38px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 0.8px;
  background-color: white;
  & div {
    height: 40px;
    font-size: 1.5em;
    background-color: ghostwhite;
  }
`;

export const PlansWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & div {
    max-width: 800px;
  }
`;
