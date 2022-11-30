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
import useStomp from "../../hooks/useStomp";
import useSWRInfinite from "swr/infinite";
import { infiniteFetcher } from "../../utils/fetchers";
import { ChatDto } from "../../types/db";
import { IMessage, StompSubscription } from "@stomp/stompjs";
import { testUserIdx } from "../../pages/Main";
import makeDateSection from "../../utils/makeDateSection";
import dayjs from "dayjs";

const chatSize = 20;
const roomIdx = 1;
const postIdx = 20;

const subscriptions: { [roomIdx: number]: StompSubscription } = {};
const ChatRoom = () => {
  const { data: chats, mutate } = useSWRInfinite<ChatDto[]>(
    (index) => `/chat/load/${roomIdx}?page=${index}&size=${chatSize}`,
    infiniteFetcher,
    {}
  );
  const [chat, setChat] = useState<string>("");
  const scrollbarRef = useRef<Scrollbars>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [client, disconnect] = useStomp("chat");
  const onSubmitChat = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (chat.trim() === "") return;
      console.log(chat);
      const myChat: ChatDto = {
        type: "",
        senderIdx: testUserIdx,
        nickname: `tester_${testUserIdx}`,
        data: chat,
        writtenAt: dayjs().toString(),
      };
      const quote = { senderIdx: testUserIdx, content: chat };
      //TODO 채팅 송신 메서드. 주소 확인 필요
      client?.publish({
        destination: `/app/stomp/${roomIdx}`,
        body: JSON.stringify(quote),
        skipContentLengthHeader: true,
      });
      mutate((chats: ChatDto[][] | undefined) => {
        chats?.[0].unshift(myChat);
        return chats;
      }, false)
        .then()
        .catch();
      setChat("");
    },
    [chat, textAreaRef]
  );

  const onReceiveChat = useCallback((message: IMessage) => {
    const body = JSON.parse(message.body);
    const receivedChat: ChatDto = body.result;
    mutate((chats: ChatDto[][] | undefined) => {
      chats?.[0].unshift(receivedChat);
      return chats;
    }, false)
      .then()
      .catch();
  }, []);

  useEffect(() => {
    scrollbarRef.current?.scrollToBottom();
  }, []);

  useEffect(() => {
    if (!subscriptions[roomIdx] && client) {
      //TODO 채팅 수신 메서드. 주소 확인 필요
      subscriptions[roomIdx] = client?.subscribe("", onReceiveChat);
    }
    client?.activate();
    return () => {
      client?.deactivate();
      if (subscriptions[roomIdx] && client) {
        subscriptions[roomIdx].unsubscribe();
        delete subscriptions[roomIdx];
        disconnect();
      }
    };
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
