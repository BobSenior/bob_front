import { ChatContainer, ChatUserDiv, ChatWrapper } from "./styles";
import React, { memo } from "react";
import gravatar from "gravatar";
import dayjsAll from "../../utils/dayjsAll";
import { ShownChat } from "../../types/db";

interface Props {
  chatData: ShownChat;
}

const userIdx = 122;

const Chat = ({ chatData }: Props) => {
  const chatOwner = chatData.senderIdx === userIdx ? "Sender" : "Receiver";

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
