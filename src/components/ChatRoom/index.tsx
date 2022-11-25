import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  FormEvent,
} from "react";
import { ChatRoomContainer, PromiseVoteContainer } from "./style";
import { PlansWrapper } from "../../pages/Appointments/style";
import ChatList from "../ChatList";
import ChatBox from "../ChatBox";
import { Scrollbars } from "react-custom-scrollbars-2";
import { toast } from "react-toastify";

const ChatRoom = () => {
  const [showPromiseVote, setShowPromiseVote] = useState<boolean>(true);
  const [chat, setChat] = useState<string>("");
  const scrollbarRef = useRef<Scrollbars>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
