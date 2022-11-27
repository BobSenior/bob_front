import styled from "@emotion/styled/macro";

export const ResultsSpan = styled.span`
  display: inline-block;
  width: fit-content;
  padding: 1.5px 3px;
  border-radius: 5px;
  text-transform: uppercase;
  margin: 2px;
  background-color: #b6d1d7;
  text-align: center;
  text-decoration: none;
`;

export const HorizontalScrollMenu = styled.div`
  overflow: auto;
  white-space: nowrap;
  width: 100%;
  max-width: inherit;
`;

export const SearchContainer = styled.div`
  background-color: #b6d1d7;
  border-radius: 5px;
  display: flex;
  & form {
    display: flex;
    width: 100%;
    & input {
      width: 100%;
      font-size: 0.8em;
    }
  }
`;

export const Header = styled.div`
  display: grid;
  max-height: 50px;
  grid-template-columns: 1fr 50px;
  gap: 5px;
  max-width: inherit;
  margin-bottom: 5px;
`;

export const Wrapper = styled.div`
  width: 70vw;
  max-width: 700px;
  display: flex;
  flex-direction: column;
`;
