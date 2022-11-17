import { ChatContainer, ChatUserDiv, ChatWrapper } from "../Chat/styles";
import React, { memo } from "react";
import gravatar from "gravatar";
import dayjs from "dayjs";
import MemberBtn from "../MemberBtn";

const Chat = () => {
  // const user = "Sender" in data ? data.Sender : data.User;
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
    <ChatWrapper>
      <ChatContainer>
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
        <pre>{result}</pre>
      </ChatContainer>
      <span className={"chat-time"}>
        {dayjs(data.createdAt).format("HH:MM")}
      </span>
    </ChatWrapper>
  );
};

export default memo(Chat);
