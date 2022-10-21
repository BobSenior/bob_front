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
export const PlansBody = styled.div``;

export const PlansWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  //flex-direction: column;
  //align-items: center;
  max-width: 800px;
  width: 100%;
`;
