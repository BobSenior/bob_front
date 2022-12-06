import { AlarmContext, AlarmInfoWrapper } from "./style";
import UnreadChatSvg from "../../assets/icons/chatbubbles-outline.svg";
import NewVoteSvg from "../../assets/icons/reader-outline.svg";
import AccessibilitySvg from "../../assets/icons/accessibility-outline.svg";
import HappyFaceSvg from "../../assets/icons/happy-outline.svg";
import TrashBinSVg from "../../assets/icons/trash-bin-outline.svg";
import { ShownNotice } from "../../types/db";
import { NavLink } from "react-router-dom";

interface Props {
  data: ShownNotice;
}

interface AlarmType {
  svg: string;
  context: string;
  url: (postIdx?: number) => string;
  postDetail: (postIdx?: number) => string;
}

const AlarmInfos: { [type: string]: AlarmType } = {
  UnreadChat: {
    svg: UnreadChatSvg,
    context: "개의 읽지않은 채팅이 있습니다.",
    url: (postIdx) => "/main/plans/participating",
    postDetail: () => " ",
  },
  CanceledPlan: {
    svg: TrashBinSVg,
    context: "약속이 취소되었습니다.",
    url: (postIdx) => `/main/plans/waiting`,
    postDetail: (postIdx) => `#${postIdx}`,
  },
  PAIAccept: {
    svg: HappyFaceSvg,
    context: "새 약속에 참가했습니다.",
    url: (postIdx) => `/main/appointment/${postIdx}`,
    postDetail: (postIdx) => `#${postIdx}`,
  },
  NewVote: {
    svg: NewVoteSvg,
    context: "새 투표가 등록되었습니다.",
    url: (postIdx) => `/main/appointment/${postIdx}`,
    postDetail: (postIdx) => `#${postIdx}`,
  },
  PAIRequest: {
    svg: AccessibilitySvg,
    context: "새로운 참가요청이 있습니다.",
    url: (postIdx) => `/main/appointment/${postIdx}`,
    postDetail: (postIdx) => `#${postIdx}`,
  },
};

const AlarmInfoDiv = ({ data }: Props) => {
  return (
    <NavLink
      to={AlarmInfos[data.type].url(data.postIdx)}
      end={true}
      style={{ textDecoration: "none", color: "black" }}
    >
      <AlarmInfoWrapper>
        <div className={"alarm-icon-container"}>
          <img src={AlarmInfos[data.type].svg} alt={"alarm-icon"} />
        </div>
        <AlarmContext>
          <span>
            {(data.type === "UnreadChat" ? data.unreadChatNum : "") +
              AlarmInfos[data.type].context}
          </span>
          <span style={{ fontSize: "xx-small" }}>
            {AlarmInfos[data.type].postDetail(data.postIdx)}
          </span>
        </AlarmContext>
      </AlarmInfoWrapper>
    </NavLink>
  );
};

export default AlarmInfoDiv;
