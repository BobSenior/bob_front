import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  FormEvent,
} from "react";
import { ChatRoomContainer } from "./style";
import ChatList from "../ChatList";
import ChatBox from "../ChatBox";
import { Scrollbars } from "react-custom-scrollbars-2";
import useSWRInfinite from "swr/infinite";
import { infiniteFetcher } from "../../utils/fetchers";
import { ChatDto } from "../../types/db";
import makeDateSection from "../../utils/makeDateSection";
import { toast } from "react-toastify";

const chatSize = 20;
const postIdx = 1;

const ChatRoom = () => {
  const { data: chats, mutate } = useSWRInfinite<ChatDto[]>(
    (index) => `/chat/load/${roomIdx}?page=${index}&size=${chatSize}`,
    infiniteFetcher,
    {}
  );
  const [chatInput, setChatInput] = useState<string>("");
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

  const chatDateSections = makeDateSection(chats ? chats.flat().reverse() : []);

  return (
    <ChatRoomContainer className={"chat-room-container"}>
      <ChatList ref={scrollbarRef} chatDateSections={chatDateSections} />
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
  );
};
export default ChatRoom;
