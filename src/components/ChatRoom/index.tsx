import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  FormEvent,
  useContext,
} from "react";
import { ChatRoomContainer } from "./style";
import ChatList from "../ChatList";
import ChatBox from "../ChatBox";
import { Scrollbars } from "react-custom-scrollbars-2";
import useSWRInfinite from "swr/infinite";
import { BaseResponse } from "../../types/db";
import { infiniteFetcher, postFetcher } from "../../utils/fetchers";
import { ShownChat } from "../../types/db";
import makeDateSection from "../../utils/makeDateSection";
import { Message } from "stompjs";
import useStomp from "../../hooks/useStomp";
import dayjs from "dayjs";
import GlobalContext from "../../hooks/GlobalContext";
import { Navigate } from "react-router-dom";

const chatSize = 20;

const ChatRoom = (data: { id: number }) => {
    const myData = JSON.parse(sessionStorage.getItem("myData")??"")
  if (!myData) return <Navigate to={"/login"} />;
  const {
    data: chats,
    setSize,
    mutate,
  } = useSWRInfinite<ShownChat[]>(
    (index) => `/chat/load/${data.id}?page=${index}&size=${chatSize}`,
    infiniteFetcher,
    {
      revalidateOnMount: true,
      revalidateFirstPage: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    }
  );

  const [chat, setChat] = useState<string>("");
  const scrollbarRef = useRef<Scrollbars>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [sock, stomp, disconnect] = useStomp();

  const isEmpty = chats?.[0].length === 0;
  const isReachingEnd =
    isEmpty || (chats && chats[chats.length - 1]?.length < chatSize) || false;

  const onReceiveChat = useCallback(
    (message: Message) => {
      const receivedBody: BaseResponse<ShownChat> = JSON.parse(message.body);
      const receivedChat: ShownChat = receivedBody.result;
      if (receivedChat.senderIdx == myData.userIdx) return;
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
      if (!myData || !chat.trim()) return;
      const sendChat: ShownChat = {
        nickname: myData.nickname,
        writtenAt: dayjs().toString(),
        content: chat,
        senderIdx: myData.userIdx,
      };
      stomp?.send(
        `/app/stomp/${data.id}`,
        {},
        JSON.stringify({
          senderIdx: myData.userIdx,
          data: chat,
        })
      );
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
        .catch((err) => console.log(err));
    },
    [chat, textAreaRef,myData]
  );

  useEffect(() => {
    setTimeout(() => {
      scrollbarRef.current?.scrollToBottom();
    }, 900);
  }, []);

  useEffect(() => {
    let sessionUrl: string = "";
    stomp?.connect({}, () => {
      stomp?.subscribe(`/topic/room/${data.id}`, onReceiveChat);
      // @ts-ignore
      sessionUrl = sock._transport.url;
      const sessionParses = sessionUrl.split("/");
      console.log("parsed", sessionParses);
      postFetcher
        .post(`/stomp/record/${data.id}`, {
            sessionId:sessionParses[6],
            userIdx:myData?.userIdx,
        })
        .then()
        .catch();
      stomp?.subscribe(`/topic/room/${data.id}`, onReceiveChat);
    });

    return () => {
      disconnect(() => {
        stomp?.unsubscribe(`${data.id}`);
      });
    };
  }, [stomp, sock, data]);

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
