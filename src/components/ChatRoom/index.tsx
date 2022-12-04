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
import { ShownChat } from "../../types/db";
import makeDateSection from "../../utils/makeDateSection";
import { Message } from "stompjs";
import useStomp from "../../hooks/useStomp";
import dayjs from "dayjs";

const chatSize = 20;
const postIdx = 1;
const userIdx = 12;

const ChatRoom = () => {
  const {
    data: chats,
    setSize,
    mutate,
  } = useSWRInfinite<ShownChat[]>(
    (index) => `/chat/load/${postIdx}?page=${index}&size=${chatSize}`,
    infiniteFetcher,
    {
      revalidateOnMount: true,
      revalidateFirstPage: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    }
  );
  const [chat, setChat] = useState<string>("");
  const scrollbarRef = useRef<Scrollbars>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [stomp, disconnect] = useStomp();

  const isEmpty = chats?.[0].length === 0;
  const isReachingEnd =
    isEmpty || (chats && chats[chats.length - 1]?.length < chatSize) || false;

  const onReceiveChat = useCallback(
    (message: Message) => {
      const receivedBody = JSON.parse(message.body);
      const receivedChat: ShownChat = receivedBody.data.result;
      mutate((currentData: ShownChat[][] | undefined) => {
        const fstChatList: ShownChat[] = [receivedChat];
        if (currentData) return [fstChatList, ...currentData];
        const newChats: ShownChat[][] = [];
        newChats.push(fstChatList);
        return newChats;
      }, false)
        .then()
        .catch((err) => console.error(err));
    },
    [chat, textAreaRef]
  );

  const onSubmitChat = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!chat.trim()) return;
      const sendChat: ShownChat = {
        nickname: "123",
        writtenAt: dayjs().toString(),
        content: chat,
        senderIdx: userIdx,
      };
      stomp?.send(`/app/stomp/${postIdx}`, {}, JSON.stringify(sendChat));
      mutate((currentData: ShownChat[][] | undefined) => {
        const fstChatList: ShownChat[] = [sendChat];
        if (currentData) return [fstChatList, ...currentData];
        const newChats: ShownChat[][] = [];
        newChats.push(fstChatList);
        return newChats;
      }, false)
        .then(() => {
          scrollbarRef.current?.scrollToBottom();
          setChat("");
        })
        .catch();
    },
    [chat, textAreaRef]
  );

  useEffect(() => {
    scrollbarRef.current?.scrollToBottom();
  }, []);

  useEffect(() => {
    stomp?.connect({}, () => {
      stomp?.subscribe(`/topic/room/${postIdx}`, onReceiveChat);
    });
    return () => {
      disconnect(() => {
        stomp?.unsubscribe(`${postIdx}`);
      });
    };
  }, [stomp]);

  const chatDateSections = makeDateSection(chats ? chats.flat().reverse() : []);

  return (
    <ChatRoomContainer className={"chat-room-container"}>
      <ChatList
        ref={scrollbarRef}
        chatDateSections={chatDateSections}
        setSize={setSize}
        isReachingEnd={isReachingEnd}
      />
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
