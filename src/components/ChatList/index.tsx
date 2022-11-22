import Chat from "../Chat";
import { ChatZone, Section, StickyHeader } from "./styles";
import React, { useCallback, forwardRef } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

const ChatList = forwardRef<Scrollbars>(({}, scrollBarRef) => {
  return (
    <ChatZone>
      <Scrollbars ref={scrollBarRef} universal={true}>
        <Section className={`section-1`} key={"1"}>
          <Chat chat={"123"} />
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
});

export default ChatList;
