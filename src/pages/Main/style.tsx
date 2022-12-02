import styled from "@emotion/styled/macro";

export const PromisesColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  row-gap: 7px;
  padding: 5px 5px;
`;

export const PromisesWrapper = styled.div`
  display: grid;
  width: 100%;
`;

export const PageSpinnerWrapper = styled.div`
  min-height: 10vh;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  & .end-point {
    font-size: 0.85em;
    color: gray;
  }
`;
