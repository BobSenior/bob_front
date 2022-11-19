import styled from "@emotion/styled/macro";

export const ChatRoomContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 76px);
  flex-flow: column;
  position: relative;
  width: 100%;
`;

export const ChatRoomHeader = styled.header`
  display: flex;
  align-items: center;
  background-color: var(--basic-color);
  height: 38px;
  & .back-arrow-image {
    width: 32px;
    height: 32px;
    cursor: pointer;
    margin-left: 5px;
  }
`;
