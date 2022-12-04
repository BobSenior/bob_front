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


const ChatRoom = () => {
    const {id} = useParams();
  const client = useRef({});
  const [showPromiseVote, setShowPromiseVote] = useState<boolean>(true);
  const [chat, setChat] = useState<string>("");
  const scrollbarRef = useRef<Scrollbars>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const sock = new SockJs("http://localhost:8080/ws/chat");
  const stomp = StompJs.over(sock);

    const stompConnect = () => {
        console.log(sock)
        stomp.connect({}, ()=> {
            stomp?.subscribe(`/topic/room/${id}`,(message)=>{
                console.log(message)
            })
        })
    };

    


    useEffect(()=>{
        stompConnect();

    },[]);




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
    <ChatRoomContainer className={"chat-room-container"}>
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
  );
};
export default ChatRoom;
