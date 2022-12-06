import { ShownChat } from "../types/db";
import dayjsAll from "./dayjsAll";

export default function makeDateSection(chats: ShownChat[]) {
  const sections: { [key: string]: ShownChat[] } = {};
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
