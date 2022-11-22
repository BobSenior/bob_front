import { AlarmContext, AlarmInfoWrapper } from "./style";
import UnreadChatSvg from "../../assets/icons/chatbubbles-outline.svg";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import {ShownNotice} from "../../types/db";

interface Props{
    data:ShownNotice;
}

const AlarmInfoDiv = ({data}:Props) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <AlarmInfoWrapper>
      <div className={"alarm-icon-container"}>
        {isLoading ? (
          <Skeleton width={"28px"} height={"28px"} circle={true} />
        ) : (
          <img src={UnreadChatSvg} alt={"alarm-icon"} />
        )}
      </div>
      <AlarmContext>
        {isLoading ? (
          <Skeleton width={"150px"} />
        ) : (
          <span>{data.text}</span>
        )}
      </AlarmContext>
    </AlarmInfoWrapper>
  );
};

export default AlarmInfoDiv;
