import { ChatZone, Section, StaticHeader, StickyHeader } from "./styles";
import React, {
  forwardRef,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import { positionValues, Scrollbars } from "react-custom-scrollbars-2";
import { ShownChat } from "../../types/db";
import Chat from "../Chat";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";

interface Props {
  chatDateSections: { [date: string]: ShownChat[] };
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<ShownChat[][] | undefined>;
  isReachingEnd: boolean;
}
const ChatList = forwardRef<Scrollbars, Props>(
  ({ chatDateSections, setSize, isReachingEnd }, scrollBarRef) => {
    const [isVisibleHeader, setVisiblieHeader] = useState(false);
    const onScroll = useCallback(
      (values: positionValues) => {
        if (values.scrollTop === 0 && !isReachingEnd) {
          console.log("scroll 가장 위");
          setSize((prevSize) => prevSize + 1).then(() => {
            // 스크롤 위치 유지
            const current = (scrollBarRef as MutableRefObject<Scrollbars>)
              ?.current;
            if (current) {
              current.scrollTop(
                current.getScrollHeight() - values.scrollHeight
              );
            }
          });
        }
      },
      [scrollBarRef, isReachingEnd, setSize]
    );

    const onScrollStart = useCallback(() => {
      setVisiblieHeader(true);
      setTimeout(() => {
        setVisiblieHeader(false);
      }, 3000);
    }, []);

    return (
      <ChatZone>
        <Scrollbars
          ref={scrollBarRef}
          onScrollFrame={onScroll}
          onScrollStart={onScrollStart}
        >
          {Object.entries(chatDateSections).map(([date, chats]) => {
            return (
              <Section className={`section-${date}`} key={date}>
                {!isVisibleHeader && (
                  <StaticHeader>
                    <span>{date}</span>
                  </StaticHeader>
                )}
                {isVisibleHeader && (
                  <StickyHeader
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.5 }}
                  >
                    <span>{date}</span>
                  </StickyHeader>
                )}
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
