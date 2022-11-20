import styled from "@emotion/styled/macro";

export const PromiseVoteContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px 30px;
  column-gap: 12px;
  margin-right: 15px;
  & div {
    display: flex;
    flex-direction: column;
    & span {
      font-size: 0.8em;
    }
  }
  & button {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    border: none;
  }
`;

export const ChatRoomContainer = styled.div`
  position: relative;
  display: grid;
  height: calc(100vh - 76px);
  width: 100%;
  grid-template-rows: 38px 1fr;
`;

export const ChatRoomHeader = styled.header`
  display: flex;
  align-items: center;
  background-color: white;
  height: 38px;
  justify-content: flex-end;
  & .back-arrow-image {
    position: absolute;
    top: 3px;
    left: 0;
    width: 32px;
    height: 32px;
    cursor: pointer;
    margin-left: 5px;
  }
`;
