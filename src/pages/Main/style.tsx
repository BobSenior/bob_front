import styled from "@emotion/styled/macro";

export const PromiseDiv = styled.div`
  min-width: 320px;
  height: 100px;
  border: black 10px;
  background-color: blue;
`;

export const PromiseList = styled.div`
  box-sizing: inherit;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${PromiseDiv}
`;
