import styled from "@emotion/styled/macro";

export const Container = styled.div`
  padding: 7px 5px;
  width: 200px;
  display: grid;
  grid-template-columns: 55px 1fr;
  column-gap: 10px;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
