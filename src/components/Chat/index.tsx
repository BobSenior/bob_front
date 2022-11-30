import { ChatContainer, ChatUserDiv, ChatWrapper } from "./styles";
import React, { memo } from "react";
import gravatar from "gravatar";
import dayjsAll from "../../utils/dayjsAll";
import { ChatDto } from "../../types/db";
import useMySWR from "../../data/useMySWR";

interface Props {
  chat: ChatDto;
}

const userIdx = 12;

const Chat = ({ chat }: Props) => {
  const { data } = useMySWR;
  const chatOwner = chat.senderIdx === userIdx ? "Sender" : "Receiver";

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
              src={gravatar.url(chat.nickname, { s: "32px", d: "retro" })}
              alt={chat.nickname + "'s avatar"}
            />
            <b className={"user-name"}>{chat.nickname}</b>
          </ChatUserDiv>
        )}
        <pre>{chat.data}</pre>
      </ChatContainer>
      <span className={"chat-time"}>{dayjsAll(chat.writtenAt).hourmin}</span>
    </ChatWrapper>
  );
};

export default memo(Chat);
