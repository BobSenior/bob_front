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
import { ActivationState, IMessage, StompSubscription } from "@stomp/stompjs";
import { testUserIdx } from "../../pages/Main";
import makeDateSection from "../../utils/makeDateSection";
import dayjs from "dayjs";

const chatSize = 20;
const postIdx = 1;

const subscriptions: { [roomIdx: number]: StompSubscription } = {};
const ChatRoom = () => {
  const [client, disconnect] = useStomp("chat");
  const { data: chats, mutate } = useSWRInfinite<ChatDto[]>(
    (index) => `/chat/load/${postIdx}?page=${index}&size=${chatSize}`,
    infiniteFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateFirstPage: false,
    }
  );
  const [chatInput, setChatInput] = useState<string>("");
  const scrollbarRef = useRef<Scrollbars>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);




  const onSubmitChat = useCallback(
    (e: FormEvent) => {
      // e.preventDefault();
      // if (chatInput.trim() === "") return;
      // const myChat: ChatDto = {
      //   type: "123",
      //   senderIdx: testUserIdx,
      //   nickname: `tester_${testUserIdx}`,
      //   data: chatInput,
      //   writtenAt: dayjs().toString(),
      // };
      // const quote = { senderIdx: testUserIdx, content: chatInput };
      // //TODO 채팅 송신 메서드. 주소 확인 필요
      // client?.publish({
      //   destination: `/app/stomp/${postIdx}`,
      //   body: JSON.stringify(quote),
      //   skipContentLengthHeader: true,
      // });
      // mutate((chats: ChatDto[][] | undefined) => {
      //   chats?.[0].unshift(myChat);
      //   return chats;
      // }, false)
      //   .then()
      //   .catch();
      // setChatInput("");
    },
    [chatInput]
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
    // if (client && !subscriptions[postIdx]) {
    //   subscriptions[postIdx] = client.subscribe(
    //     `/topic/room/${postIdx}`,
    //     onReceiveChat
    //   );
    // }
    return () => {
      client?.deactivate();
      if (subscriptions[postIdx] && client) {
        subscriptions[postIdx].unsubscribe();
        delete subscriptions[postIdx];
        disconnect();
      }
    };
  }, []);

  const chatDateSections = makeDateSection(chats ? chats.flat().reverse() : []);

  return (
    <ChatRoomContainer className={"chat-room-container"}>
      <ChatList ref={scrollbarRef} chatDateSections={chatDateSections} />
      <ChatBox
        chat={chatInput}
        onSubmitForm={onSubmitChat}
        onChangeChat={(e) => {
          setChatInput(e.target.value);
        }}
        ref={textAreaRef}
        placeholder={"채팅을 시작하세요."}
      />
    </ChatRoomContainer>
  );
};
export default ChatRoom;
