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
import SockJs from "sockjs-client";
import StompJs from "stompjs";

interface props {
  closeChatRoom?: () => void;
}

const ChatRoom = ({ closeChatRoom }: props) => {
  const [showPromiseVote, setShowPromiseVote] = useState<boolean>(true);
  const [chat, setChat] = useState<string>("");
  const scrollbarRef = useRef<Scrollbars>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const sock = new SockJs("http://localhost:8080/ws/chat");
  const stomp = StompJs.over(sock);
  console.log(sock)

  const stompConnect = () => {
    console.log(sock)
    stomp.connect({}, ()=> {
      stomp?.subscribe('/topic/room/77',(message)=>{
        console.log(message)
      })
    })
  };

  const stompDisConnect = () => {
    try {
      stomp?.disconnect(() => {
        stomp?.unsubscribe("sub-0");
      });
    } catch (err) {

    }
  };

  const SendMessage = () => {
    const data = {
      type:"NORMAL",
      senderIdx:1,
      data:"제발 좀 되라"
    };
    //예시 - 데이터 보낼때 json형식을 맞추어 보낸다.
    stomp?.send(`/app/stomp/77`, {},JSON.stringify(data));
  };


  useEffect(()=>{
    stompConnect();
  });



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
          <button onClick={SendMessage}>test</button>
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
