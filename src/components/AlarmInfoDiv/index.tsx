import { AlarmContext, AlarmInfoWrapper } from "./style";
import UnreadChatSvg from "../../assets/icons/chatbubbles-outline.svg";
import dayjsAll from "../../utils/dayjsAll";
import Skeleton from "react-loading-skeleton";
import {ShownNotice} from "../../types/db";

interface Props{
    data:ShownNotice;
}

const AlarmInfoDiv = ({data}:Props) => {

const AlarmInfoDiv = () => {
  return (
    <AlarmInfoWrapper>
      <div className={"alarm-icon-container"}>
        <img src={UnreadChatSvg} alt={"alarm-icon"} />
      </div>
      <AlarmContext>
        <span>읽지않은 메시지가 있습니다.</span>
        <span style={{ fontSize: "xx-small" }}>
          {dayjsAll("2022-10-10").fromNow}
      </AlarmContext>
    </AlarmInfoWrapper>
  );
};

export default AlarmInfoDiv;
