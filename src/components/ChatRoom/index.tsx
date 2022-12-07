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
import { toast } from "react-toastify";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
import {useParams} from "react-router-dom";
import {postFetcher} from "../../utils/fetchers";
import {AxiosResponse} from "axios";
import {BaseResponse} from "../../types/db";



const ChatRoom = (data:{
    id:number
}) => {
    const {id} = useParams();
  const client = useRef({});
  const [showPromiseVote, setShowPromiseVote] = useState<boolean>(true);
  const [chat, setChat] = useState<string>("");
  const scrollbarRef = useRef<Scrollbars>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const sock = new SockJs("http://localhost:8080/ws/chat");
  const stomp = StompJs.over(sock);

    const stompConnect = useCallback(() => {
        stomp.connect({}, ()=> {
            stomp?.subscribe(`/topic/room/${data.id}`,(message)=>{
                console.log(message)
            })
        })
    },[id]);

    


    useEffect(()=>{
        stompConnect();

    },[id]);




    const onSubmitChat = useCallback(
    (e: FormEvent) => {
        console.log(id,"id")
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

      const data = {
          senderIdx:1,
          data:chat
      };

      stomp.send(`/app/stomp/77`,{},JSON.stringify(data))
    },
    [chat, textAreaRef,id]
  );

  useEffect(() => {
    scrollbarRef.current?.scrollToBottom();
  }, []);

  return (
    <ChatRoomContainer className={"chat-room-container"}>
        {/*<ChatList ref={scrollbarRef} chatDateSections={} setSize={} isReachingEnd={}/>*/}
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
