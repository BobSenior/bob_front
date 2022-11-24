/** @jsxImportSource @emotion/react */
import React, {
  useCallback,
  useContext,
  useState,
  MouseEvent,
  useEffect,
  useMemo,
} from "react";
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
  TNPSection,
  MembersColumn,
  TitleHeader,
  TagSection,
  NoOneSpan,
  RequestBtnWrapper,
} from "./style";
import { PostViewDTO } from "../../types/db";
import ColorHash from "color-hash";
import PickerSvg from "../../assets/icons/location-outline.svg";
import ColoredBtn from "../../assets/buttons/ColoredBtn";
import GlobalContext from "../../hooks/GlobalContext";
import MemberBtn from "../MemberBtn";
import axios from "axios";
import { getFetcher, postFetcher } from "../../utils/fetchers";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import dayjsAll from "../../utils/dayjsAll";
import { HashTagContainer } from "../PostBox/style";
import HashTag from "../HashTag";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { testUserIdx } from "../../pages/Main";
import { toast } from "react-toastify";

interface props {
  postIdx: number;
}

const errorAlarm = (message: string): void => {
  toast.error(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const PostDetailsBox = ({ postIdx }: props) => {
  const [postDetailData, setPostDetailData] = useState<PostViewDTO | null>(
    null
  );
  const [isError, setError] = useState<boolean>(false);
  const [requestType, setRequestType] = useState<string>("");
  const { setShowMapModal, setAddress } = useContext(GlobalContext);

  //TODO: 1. 이미 참가 완료된 상태 분리 2. buyer하고 receiver하고 따로 불가능한가요?

  const receiversSpans = useMemo(() => {
    if (!postDetailData) return null;
    else if (postDetailData.receiver.length === 0)
      return <NoOneSpan>아무도 없어요.</NoOneSpan>;

    return postDetailData.receiver.map((member) => {
      return (
        <MemberBtn
          userIdx={member.userIdx}
          nickName={member.nickname}
          department={member.department}
          schoolId={member.schoolId}
          key={generateUniqueID()}
        />
      );
    });
  }, [postDetailData]);

  const buyersSpans = useMemo(() => {
    if (!postDetailData) return null;
    else if (postDetailData.buyer.length === 0)
      return <NoOneSpan>아무도 없어요.</NoOneSpan>;

    return postDetailData.buyer.map((member) => {
      return (
        <MemberBtn
          userIdx={member.userIdx}
          nickName={member.nickname}
          department={member.department}
          schoolId={member.schoolId}
          key={generateUniqueID()}
        />
      );
    });
  }, [postDetailData]);

  const onClickParticipationButton = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (!postDetailData) return;

      if (postDetailData.requested) {
        //TODO:참가 신청 취소 API 연결 필요
        postFetcher
          .post(`/post/request/reverse`, {
            userIdx: testUserIdx,
            postIdx: postIdx,
          })
          .then((res) => {
            if (res.data.isSuccess) {
              setPostDetailData((prevState) => {
                if (!prevState) return null;
                return { ...prevState, requested: !prevState.requested };
              });
            } else errorAlarm(res.data.message);
          })
          .catch((err) => console.error(err));
      } else {
        //TODO:참가 신청 API 연결 필요
        axios
          .post("/post/request", {
            userIdx: testUserIdx,
            postIdx: postIdx,
            position: requestType,
          })
          .then((res) => {
            if (res.data.isSuccess) {
              setPostDetailData((prevState) => {
                if (!prevState) return null;
                return { ...prevState, requested: !prevState.requested };
              });
            } else errorAlarm(res.data.message);
          })
          .catch((err) => console.error(err));
      }
    },
    [postDetailData]
  );

  const onClickPlaceInfoDiv = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (postDetailData) {
        setAddress(postDetailData.location);
        setShowMapModal(true);
      }
    },
    [postDetailData]
  );

  useEffect(() => {
    getFetcher
      .get(`/post/${postIdx}?userIdx=${testUserIdx}`, { timeout: 5000 })
      .then((res) => {
        setPostDetailData(res.data.result);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <DetailWrapper onClick={(e) => e.stopPropagation()}>
      {isError ? (
        <div
          style={{
            height: "50px",
            width: "100%",
            textAlign: "center",
            color: "grey",
          }}
        >
          네트워크 연결상태를 확인해주세요.
        </div>
      ) : (
        <>
          <Section css={HeaderSection}>
            <h1>Info</h1>
            <div className={"header-section-wrapper"}>
              {postDetailData ? (
                <>
                  <span
                    style={{
                      backgroundColor: new ColorHash().hex(
                        postDetailData.groupConstraint
                      ),
                    }}
                    css={TitleHeader}
                    className={"header-title"}
                  >
                    {postDetailData.groupConstraint}
                  </span>
                  <span className={"header-title"}>{postDetailData.title}</span>
                </>
              ) : (
                <SkeletonTheme height={"1.2em"} width={"30px"} inline={false}>
                  <Skeleton />
                  <span style={{ width: "5px" }}></span>
                  <Skeleton width={"160px"} />
                </SkeletonTheme>
              )}
            </div>
          </Section>
          <Section css={TNPSection}>
            {postDetailData ? (
              <>
                <PlaceInfoDiv
                  whileTap={{ scale: 0.85 }}
                  onClick={onClickPlaceInfoDiv}
                >
                  <PickerImg src={PickerSvg} />
                  <span>{postDetailData.location}</span>
                </PlaceInfoDiv>
                <TimeInfoDiv>
                  <span>
                    {dayjsAll(postDetailData.meetingAt).appointmentDate()}
                  </span>
                </TimeInfoDiv>
              </>
            ) : (
              <SkeletonTheme width={"70px"} height={"1.5em"}>
                <Skeleton />
                <Skeleton />
              </SkeletonTheme>
            )}
          </Section>
          <Section>
            <h1>Members</h1>
            <MembersDiv>
              <MembersColumn>
                <h4>buyers</h4>
                {postDetailData ? (
                  <>{buyersSpans}</>
                ) : (
                  <Skeleton count={2} height={"0.95em"} width={"75px"} />
                )}
              </MembersColumn>
              <MembersColumn>
                <h4>receivers</h4>
                {postDetailData ? (
                  <>{receiversSpans}</>
                ) : (
                  <Skeleton count={2} height={"0.95em"} width={"75px"} />
                )}
              </MembersColumn>
            </MembersDiv>
          </Section>
          <Section css={ContentSection}>
            <h1>Content</h1>
            <div className={"content-wrapper"}>
              {postDetailData ? (
                <p>{postDetailData.contents}</p>
              ) : (
                <Skeleton height={"0.9em"} width={"200px"} count={3} />
              )}
            </div>
          </Section>
          <Section css={TagSection}>
            <h1>tags</h1>
            <HashTagContainer>
              {postDetailData ? (
                <>
                  {postDetailData.tagHead.map((value) => (
                    <HashTag key={generateUniqueID()} text={value} />
                  ))}
                </>
              ) : (
                <SkeletonTheme width={"45px"} height={"18px"}>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </SkeletonTheme>
              )}
            </HashTagContainer>
          </Section>
          <Footer>
            {postDetailData && postDetailData.requested ? (
              <ColoredBtn
                width={"100%"}
                height={"35px"}
                animate={
                  postDetailData && postDetailData.requested ? "In" : "Out"
                }
                variants={InNOut}
                useTap={!!postDetailData}
                useHover={!!postDetailData}
                onClick={onClickParticipationButton}
                disable={!postDetailData}
              >
                <span>신청취소</span>
              </ColoredBtn>
            ) : (
              <>
                <ColoredBtn
                  width={"100%"}
                  height={"35px"}
                  animate={
                    postDetailData && postDetailData.requested ? "In" : "Out"
                  }
                  variants={InNOut}
                  useTap={!!postDetailData}
                  useHover={!!postDetailData}
                  onTapStart={() => setRequestType("buyer")}
                  onClick={onClickParticipationButton}
                  disable={!postDetailData}
                >
                  <span>buyer 참가신청</span>
                </ColoredBtn>
                <ColoredBtn
                  width={"100%"}
                  height={"35px"}
                  animate={
                    postDetailData && postDetailData.requested ? "In" : "Out"
                  }
                  variants={InNOut}
                  useTap={!!postDetailData}
                  useHover={!!postDetailData}
                  onClick={onClickParticipationButton}
                  onTapStart={() => setRequestType("receiver")}
                  disable={!postDetailData}
                >
                  <span>receiver 참가신청</span>
                </ColoredBtn>
              </>
            )}
          </Footer>
        </>
      )}
    </DetailWrapper>
  );
};

export default PostDetailsBox;
