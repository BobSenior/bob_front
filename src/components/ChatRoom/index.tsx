import React, {
  useCallback,
  MouseEvent,
  useState,
  useRef,
  useEffect,
  FormEvent,
} from "react";
import {
  ChatRoomContainer,
  ChatRoomHeader,
  PromiseVoteContainer,
} from "./style";
import { PlansWrapper } from "../../pages/Plans/style";
import ChatList from "../ChatList";
import ChatBox from "../ChatBox";
import BackArrowSvg from "../../assets/icons/arrow-back-outline.svg";
import { Scrollbars } from "react-custom-scrollbars-2";
import { toast } from "react-toastify";

interface props {
  closeChatRoom?: () => void;
}

const ChatRoom = ({ closeChatRoom }: props) => {
  const [showPromiseVote, setShowPromiseVote] = useState<boolean>(true);
  const [chat, setChat] = useState<string>("");
  const scrollbarRef = useRef<Scrollbars>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onClickBackArrow = useCallback((e: MouseEvent<HTMLElement>) => {
    console.log(e);
  }, []);

  const onSubmitChat = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      toast(chat, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setChat("");
    },
    [chat, textAreaRef]
  );

  useEffect(() => {
    scrollbarRef.current?.scrollToBottom();
  }, []);

  return (
    <PlansWrapper className={"chat-page-wrapper"}>
      <ChatRoomContainer className={"chat-room-container"}>
        <ChatRoomHeader>
          <img
            className={"back-arrow-image"}
            src={BackArrowSvg}
            onClick={onClickBackArrow}
            alt={"back-arrow"}
          />
          {showPromiseVote && (
            <PromiseVoteContainer>
              <div>
                <span>장소: ~</span>
                <span>시간: ~</span>
              </div>
              <button />
              <button />
            </PromiseVoteContainer>
          )}
        </ChatRoomHeader>
        <ChatList ref={scrollbarRef} />
        <ChatBox
          chat={chat}
          onSubmitForm={onSubmitChat}
          onChangeChat={(e) => {
            setChat(e.target.value);
          }}
          ref={textAreaRef}
          placeholder={"채팅을 시작하세요."}
        />
      </ChatRoomContainer>
    </PlansWrapper>
  );
};
export default ChatRoom;
