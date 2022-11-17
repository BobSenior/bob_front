import styled from "@emotion/styled";

export const ChatUserDiv = styled.div`
  display: grid;
  margin: 10px 7px;
  column-gap: 10px;
  align-items: center;
  width: fit-content;
  & img {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    border-radius: 32px;
  }
  & .user-name {
    grid-row: 1 / 2;
  }
  & .user-major {
    grid-row: 2 / 3;
    font-size: 0.7em;
  }
`;

export const ChatWrapper = styled.div`
  display: flex;
  padding: 8px 15px;
  align-items: end;
  gap: 0 5px;

  & .chat-time {
    height: fit-content;
    font-size: 0.5em;
    background-color: #f5f5f5;
    border-radius: 3px;
    padding: 1px 3px;
  }
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  min-width: 250px;
  background-color: rgba(245, 222, 179, 0.3);
  border-radius: 15px;

  & pre {
    font-family: inherit;
    white-space: pre-wrap;
    word-break: break-all;
    overflow: auto;
    padding: 5px;
    margin: 0 10px 10px;
    background-color: white;
    height: fit-content;
  }
`;