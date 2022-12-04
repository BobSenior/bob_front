import { ChatZone, Section, StickyHeader } from "./styles";
import React, { forwardRef } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { ChatDto } from "../../types/db";
import Chat from "../Chat";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";

interface Props {
  chatDateSections: { [date: string]: ChatDto[] };
}
const ChatList = forwardRef<Scrollbars, Props>(
  ({ chatDateSections }, scrollBarRef) => {
    return (
      <ChatZone>
        <Scrollbars ref={scrollBarRef}>
          {Object.entries(chatDateSections).map(([date, chats]) => {
            return (
              <Section className={`section-${date}`} key={date}>
                <StickyHeader>
                  <button>{date}</button>
                </StickyHeader>
                {chats.map((chatData) => (
                  <Chat key={generateUniqueID()} chatData={chatData} />
                ))}
              </Section>
            );
          })}
        </Scrollbars>
      </ChatZone>
    );
  }
);

export default ChatList;
