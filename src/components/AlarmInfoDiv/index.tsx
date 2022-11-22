import { AlarmContext, AlarmInfoWrapper } from "./style";
import UnreadChatSvg from "../../assets/icons/chatbubbles-outline.svg";
import dayjsAll from "../../utils/dayjsAll";
import { ShownNotice } from "../../types/db";

interface Props {
  data: ShownNotice;
}

interface IAlarmInfo {
  type: string;
  context: string;
}

const AlarmInfos = {};

const AlarmInfoDiv = ({ data }: Props) => {
  return (
    <AlarmInfoWrapper>
      <div className={"alarm-icon-container"}>
        <img src={UnreadChatSvg} alt={"alarm-icon"} />
      </div>
      <AlarmContext>
        <span>읽지않은 메시지가 있습니다.</span>
        <span style={{ fontSize: "xx-small" }}>
          {dayjsAll("2022-10-10").fromNow}
        </span>
      </AlarmContext>
    </AlarmInfoWrapper>
  );
};

export default AlarmInfoDiv;
