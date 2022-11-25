import styled from "@emotion/styled/macro";

export const PromiseVoteContainer = styled.div`
  display: grid;
  position: sticky;
  top: 0;
  position: -webkit-sticky;
  grid-template-columns: 1fr 50px 50px;
  align-content: center;
  justify-items: center;
  & span {
    justify-self: self-start;
    display: block;
    font-size: 0.8em;
  }

  & button {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: none;
  }
`;

export const ChatRoomContainer = styled.div`
  display: grid;
  height: 80vh;
  width: 100%;
  grid-template-rows: 38px 1fr;
`;
