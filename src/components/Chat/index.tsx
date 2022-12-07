import { ChatContainer, ChatUserDiv, ChatWrapper } from "./styles";
import React, {memo, useContext} from "react";
import gravatar from "gravatar";
import dayjsAll from "../../utils/dayjsAll";
import { ShownChat } from "../../types/db";
import GlobalContext from "../../hooks/GlobalContext";

interface Props {
  chatData: ShownChat;
}


const Chat = ({ chatData }: Props) => {
  const { myData, setMyData } = useContext(GlobalContext);
  const chatOwner = chatData.senderIdx === myData?.userIdx ? "Sender" : "Receiver";

  return (
    <ChatWrapper
      style={{
        flexDirection: chatOwner === "Sender" ? "row-reverse" : undefined,
      }}
    >
      <ChatContainer>
        {chatOwner != "Sender" && (
          <ChatUserDiv>
            <img
              src={gravatar.url(chatData.nickname, { s: "32px", d: "retro" })}
              alt={chatData.nickname + "'s avatar"}
            />
            <b className={"user-name"}>{chatData.nickname}</b>
          </ChatUserDiv>
        )}
        <pre>{chatData.content}</pre>
      </ChatContainer>
      <span className={"chat-time"}>
        {dayjsAll(chatData.writtenAt).hourmin}
      </span>
    </ChatWrapper>
  );
};

export default memo(Chat);
