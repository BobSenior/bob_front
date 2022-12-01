import { ChatContainer, ChatUserDiv, ChatWrapper } from "./styles";
import React, { memo } from "react";
import gravatar from "gravatar";
import dayjsAll from "../../utils/dayjsAll";
import { ChatDto } from "../../types/db";
import useMySWR from "../../data/useMySWR";

interface Props {
  chatData: ChatDto;
}

const userIdx = 12;

const Chat = ({ chatData }: Props) => {
  // const { data } = useMySWR;
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
        <pre>{chatData.data}</pre>
      </ChatContainer>
      <span className={"chat-time"}>
        {dayjsAll(chatData.writtenAt).hourmin}
      </span>
    </ChatWrapper>
  );
};

export default memo(Chat);
