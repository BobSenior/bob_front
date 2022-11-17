import React, { useCallback, MouseEvent, useState } from "react";
import { ChatRoomContainer, ChatRoomHeader } from "./style";
import { PlansWrapper } from "../../pages/Plans/style";
import ChatList from "../ChatList";
import ChatBox from "../ChatBox";
import BackArrowSvg from "../../assets/icons/arrow-back-outline.svg";

interface props {
  closeChatRoom?: () => void;
}

const ChatRoom = ({ closeChatRoom }: props) => {
  const [showPromiseVote, setShowPromiseVote] = useState<boolean>(false);
  const onClickBackArrow = useCallback((e: MouseEvent<HTMLElement>) => {
    console.log(e);
  }, []);

  return (
    <PlansWrapper className={"chat-page-wrapper"}>
      <ChatRoomContainer className={"chat-room-container"}>
        <ChatRoomHeader>
          <img src={BackArrowSvg} onClick={onClickBackArrow} />
        </ChatRoomHeader>
        <ChatList />
        <ChatBox chat={""} onSubmitForm={() => {}} onChangeChat={() => {}} />
      </ChatRoomContainer>
    </PlansWrapper>
  );
};
export default ChatRoom;
