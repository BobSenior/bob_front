/** @jsxImportSource @emotion/react */
import React, { useCallback, useContext, useState, MouseEvent } from "react";
import {
  ContentSection,
  DetailWrapper,
  Footer,
  HeaderSection,
  InNOut,
  PickerImg,
  MembersDiv,
  PlaceInfoDiv,
  Section,
  TimeInfoDiv,
  TitleHeader,
  TNPSection,
} from "./style";
import {
  AppointmentHeadDTO,
  BaseResponse,
  PostViewDTO,
  promiseInfo,
  SimplifiedUserProfileDTO,
} from "../../types/db";
import ColorHash from "color-hash";
import PickerSvg from "../../assets/icons/location-outline.svg";
import ColoredBtn from "../../assets/buttons/ColoredBtn";
import GlobalContext from "../../hooks/GlobalContext";
import MemberBtn from "../MemberBtn";
import axios from "axios";
import useSWR from "swr";
import { getFetcher } from "../../utils/fetchers";
import HashTag from "../HashTag";
import usePostView from "../../hooks/usePostView";

interface props {
  data: AppointmentHeadDTO;
}
const major = "소프트웨어학부";

const PostDetailsBox = ({ data }: props) => {
  const { data: PostView, error } = useSWR<BaseResponse<PostViewDTO>>(
    `/post/${data.postIdx}?userIdx=11`,
    getFetcher
  );
  const [participateIn, setParticipateIn] = useState(
    PostView?.result.requested
  );
  const { setShowMapModal, setAddress } = useContext(GlobalContext);
  console.log(PostView);

  //TODO: 1. 이미 참가 완료된 상태 분리 2. buyer하고 receiver하고 따로 불가능한가요?

  const onClickParticipationButton = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setParticipateIn((prevState) => {
        if (prevState) {
          //TODO:참가 신청 취소 API 연결 필요
          axios.post(`/post/request/reverse`, {
            userIdx: 11,
            postIdx: data.postIdx,
          });
        } else {
          //TODO:참가 신청 API 연결 필요
          axios.post("/post/request", {
            userIdx: 11,
            postIdx: data.postIdx,
            position: "buyer",
          });
        }
        return !prevState;
      });
    },
    [PostView]
  );

  const onClickPlaceInfoDiv = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAddress(data.location ? data.location : "");
    setShowMapModal(true);
  }, []);

  if (PostView === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <DetailWrapper onClick={(e) => e.stopPropagation()}>
      <Section css={HeaderSection}>
        <h1>Info</h1>
        <div>
          <span
            style={{
              backgroundColor: new ColorHash().hex(major),
            }}
            css={TitleHeader}
          >
            {PostView.result.groupConstraint}
          </span>
          <span>{PostView.result.title}</span>
        </div>
      </Section>
      <Section css={TNPSection}>
        <PlaceInfoDiv whileTap={{ scale: 0.85 }} onClick={onClickPlaceInfoDiv}>
          <PickerImg src={PickerSvg} />
          <span>{PostView.result.location}</span>
        </PlaceInfoDiv>
        <TimeInfoDiv>
          <span>{PostView.result.meetingAt}</span>
        </TimeInfoDiv>
      </Section>
      <Section>
        <h1>Members</h1>
        <MembersDiv>
          {PostView.result.buyer.map((user) => (
            <MemberBtn
              userIdx={user.userIdx}
              nickName={user.nickname}
              department={user.department}
              schoolId={user.schoolId}
            />
          ))}
          {PostView.result.receiver.map((user) => (
            <MemberBtn
              userIdx={user.userIdx}
              nickName={user.nickname}
              department={user.department}
              schoolId={user.schoolId}
            />
          ))}
        </MembersDiv>
      </Section>
      <Section css={ContentSection}>
        <h1>Contents</h1>
        <p>{PostView.result.contents}</p>
      </Section>
      <Footer>
        <ColoredBtn
          width={"100%"}
          height={"35px"}
          onClick={onClickParticipationButton}
          animate={participateIn ? "In" : "Out"}
          variants={InNOut}
          isHover={false}
          isTap={true}
        >
          <span>{participateIn ? "신청취소" : "참가신청"}</span>
        </ColoredBtn>
      </Footer>
    </DetailWrapper>
  );
};

export default PostDetailsBox;
