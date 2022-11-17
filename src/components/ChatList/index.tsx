import Chat from "../Chat";
import { ChatZone, Section, StickyHeader } from "../ChatList/styles";
import React, { useCallback, forwardRef, MutableRefObject } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

const ChatList = () => {
  return (
    <ChatZone>
      <Scrollbars>
        <Section className={`section-1`} key={"1"}>
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
        </Section>
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
