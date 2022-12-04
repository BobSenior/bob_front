import { ChatDto } from "../types/db";
import dayjsAll from "./dayjsAll";

export default function makeDateSection(chats: ChatDto[]) {
  const sections: { [key: string]: ChatDto[] } = {};
  chats.forEach((chat) => {
    // console.log(chat);
    const monthDate = dayjsAll(chat.writtenAt).chatDate;
    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });
  return sections;
}
