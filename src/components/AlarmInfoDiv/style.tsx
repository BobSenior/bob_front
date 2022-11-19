import styled from "@emotion/styled/macro";

export const AlarmContext = styled.div`
  display: flex;
  flex-direction: column;
  & span {
    font-size: 0.9em;
    word-break: break-word;
    text-align: left;
  }
`;

export const AlarmInfoWrapper = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  display: grid;
  align-items: center;
  grid-template-columns: 35px 1fr;
  :hover {
    background-color: #dedede;
  }
  & .alarm-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
      width: 25px;
      height: 25px;
    }
  }
`;
