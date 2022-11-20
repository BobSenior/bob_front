import { ChatContainer, ChatUserDiv, ChatWrapper } from "../Chat/styles";
import React, { memo, useRef, useState } from "react";
import gravatar from "gravatar";
import dayjs from "dayjs";
import dayjsAll from "../../utils/dayjsAll";

interface Props {
  chat?: string;
}

const Chat = ({ chat }: Props) => {
  // const user = "Sender" in data ? data.Sender : data.User;
  const chatOwner = useRef<string>("Receiver");

  const user = {
    email: "123@gmail.com",
    nickname: "abc",
    major: "소프트웨어학부",
  };
  const data = {
    createdAt: dayjs(),
  };
  const str =
    "hi!" +
    "By promptly disclosing medical errors and offering earnest apologies and fair compensation, doctors hope to make it easier to learn from mistakes and relieve the patient's anger.";

  const result = (
    <>
      {str}
      <br key={"123"} />
    </>
  );
  return (
    <ChatWrapper
      style={{
        flexDirection:
          chatOwner.current === "Sender" ? "row-reverse" : undefined,
      }}
    >
      <ChatContainer>
        {chatOwner.current != "Sender" && (
          <ChatUserDiv>
            <img
              src={gravatar.url(user.email, { s: "32px", d: "retro" })}
              alt={user.nickname + "'s avatar"}
            />
            <b className={"user-name"}>{user.nickname}</b>
            <span className={"user-major"}>
              {user.major}
              {"12"}
            </span>
          </ChatUserDiv>
        )}
        <pre>{chat ?? result}</pre>
      </ChatContainer>
      <span className={"chat-time"}>{dayjsAll(data.createdAt).hourmin}</span>
    </ChatWrapper>
  );
};

export default memo(Chat);
