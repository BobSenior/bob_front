/** @jsxImportSource @emotion/react */
import React, {
  useCallback,
  useState,
  MouseEvent,
  useEffect,
  useMemo,
  memo,
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
  TagSection,
  NoOneSpan,
} from "./style";
import { PostViewDTO } from "../../types/db";
import PickerSvg from "../../assets/icons/location-outline.svg";
import ColoredBtn from "../../assets/buttons/ColoredBtn";
import MemberBtn from "../MemberBtn";
import {
  getFetcher,
  postDetailsFetcher,
  postFetcher,
} from "../../utils/fetchers";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HashTagContainer } from "../PostBox/style";
import HashTag from "../HashTag";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { testUserIdx } from "../../pages/Main";
import { toast } from "react-toastify";
import MapDisplayModal from "../MapDisplayModal";
import TitleTagSpan from "../TitleTagSpan";
import dayjsAll from "../../utils/dayjsAll";

interface props {
  postIdx: number;
  type: string;
}

const DUTCH = "dutch";

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

const PostDetailsBox = ({ postIdx, type }: props) => {
  const [postDetailData, setPostDetailData] = useState<PostViewDTO | null>(
    null
  );
  const [isError, setError] = useState<boolean>(false);
  const [showMapDisplayModal, setShowMapDisplayModal] = useState(false);
  const [requestType, setRequestType] = useState<string>("");

  const receiversSpans = useMemo(() => {
    if (!postDetailData) return null;
    if (postDetailData.receiver.length === 0)
      return <NoOneSpan>아무도 없어요.</NoOneSpan>;

    if (type === DUTCH) {
      return postDetailData.buyer
        .filter((value, index) => index % 2 === 0)
        .map((member) => {
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
    }

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

    if (type === DUTCH) {
      return postDetailData.buyer
        .filter((value, index) => index % 2 === 1)
        .map((member) => {
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
    }

    if (postDetailData.buyer.length === 0)
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

      if (postDetailData.isRequested) {
        postFetcher
          .post(`/api/post/request/reverse`, {
            userIdx: testUserIdx,
            postIdx: postIdx,
          })
          .then((res) => {
            if (res.data.isSuccess) {
              setPostDetailData((prevState) => {
                if (!prevState) return null;
                return { ...prevState, requested: !prevState.isRequested };
              });
            } else errorAlarm(res.data.message);
          })
          .catch((err) => console.error(err));
      } else {
        postFetcher
          .post("/api/post/request", {
            userIdx: testUserIdx,
            postIdx: postIdx,
            position: requestType,
          })
          .then((res) => {
            if (res.data.isSuccess) {
              setPostDetailData((prevState) => {
                if (!prevState) return null;
                return { ...prevState, requested: !prevState.isRequested };
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
      if (
        postDetailData &&
        postDetailData.location &&
        postDetailData.latitude &&
        postDetailData.longitude
      ) {
        setShowMapDisplayModal(true);
      }
    },
    [postDetailData]
  );

  useEffect(() => {
    postDetailsFetcher(`/post/${postIdx}?userIdx=${testUserIdx}`)
      .then((res) => {
        setPostDetailData(res);
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
                  <TitleTagSpan str={postDetailData.groupConstraint} />
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
                  {postDetailData.location ?? (
                    <>
                      <PickerImg src={PickerSvg} />
                      <span>{postDetailData.location}</span>
                    </>
                  )}
                </PlaceInfoDiv>
                <TimeInfoDiv>
                  {postDetailData.meetingAt && (
                    <span>
                      {dayjsAll(postDetailData.meetingAt).appointmentDate() +
                        " " +
                        dayjsAll(postDetailData.meetingAt).appointmentTime()}
                    </span>
                  )}
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
                {type != "dutch" ?? <h4>buyers</h4>}
                {postDetailData ? (
                  <>{buyersSpans}</>
                ) : (
                  <Skeleton count={2} height={"0.95em"} width={"75px"} />
                )}
              </MembersColumn>
              <MembersColumn>
                {type != "dutch" ?? <h4>receivers</h4>}
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
            {postDetailData && postDetailData.isRequested ? (
              <ColoredBtn
                width={"100%"}
                height={"35px"}
                animate={
                  postDetailData && postDetailData.isRequested ? "In" : "Out"
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
                    postDetailData && postDetailData.isRequested ? "In" : "Out"
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
                    postDetailData && postDetailData.isRequested ? "In" : "Out"
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
      {showMapDisplayModal &&
        postDetailData &&
        postDetailData.latitude &&
        postDetailData.longitude &&
        postDetailData.location && (
          <MapDisplayModal
            setShow={setShowMapDisplayModal}
            coordinate={{
              latitude: postDetailData.latitude,
              longitude: postDetailData.longitude,
            }}
            location={postDetailData.location}
          />
        )}
    </DetailWrapper>
  );
};

export default memo(PostDetailsBox);
