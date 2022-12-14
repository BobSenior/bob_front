/** @jsxImportSource @emotion/react */
import React, {
  useCallback,
  useState,
  MouseEvent,
  useEffect,
  useMemo,
  memo,
  useContext,
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
import { postDetailsFetcher, postFetcher } from "../../utils/fetchers";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HashTagContainer } from "../PostBox/style";
import HashTag from "../HashTag";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { toast } from "react-toastify";
import MapDisplayModal from "../MapDisplayModal";
import TitleTagSpan from "../TitleTagSpan";
import dayjsAll from "../../utils/dayjsAll";
import GlobalContext from "../../hooks/GlobalContext";
import { Navigate } from "react-router-dom";

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
  const myData = JSON.parse(sessionStorage.getItem("myData") ?? "");
  if (!myData) return <Navigate to={"/login"} />;
  const [postDetailData, setPostDetailData] = useState<PostViewDTO | null>(
    null
  );
  const [isError, setError] = useState<boolean>(false);
  const [showMapDisplayModal, setShowMapDisplayModal] = useState(false);
  const [requestType, setRequestType] = useState<string>("");

  const receiversSpans = useMemo(() => {
    if (!postDetailData) return null;

    if (type === DUTCH) {
      return postDetailData.buyer
        .filter((value, index) => index % 2 === 1)
        .map((member) => {
          return (
            <MemberBtn
              uuid={member.uuid}
              userIdx={member.userIdx}
              nickName={member.nickname}
              department={member.department}
              schoolId={member.schoolId}
              key={generateUniqueID()}
            />
          );
        });
    }

    if (postDetailData.receiver.length === 0)
      return <NoOneSpan>????????? ?????????.</NoOneSpan>;

    return postDetailData.receiver.map((member) => {
      return (
        <MemberBtn
          uuid={member.uuid}
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
        .filter((value, index) => index % 2 === 0)
        .map((member) => {
          return (
            <MemberBtn
              uuid={member.uuid}
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
      return <NoOneSpan>????????? ?????????.</NoOneSpan>;

    return postDetailData.buyer.map((member) => {
      return (
        <MemberBtn
          uuid={member.uuid}
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
        postFetcher
          .post("/api" + `/post/request/reverse`, {
            userIdx: myData.userIdx,
            postIdx: postIdx,
          })
          .then((res) => {
            if (res.data.isSuccess) {
              setPostDetailData((prevState) => {
                if (!prevState) return null;
                return { ...prevState, requested: false };
              });
            } else errorAlarm(res.data.message);
          })
          .catch((err) => console.error(err));
      } else {
        postFetcher
          .post("/api" + "/post/request", {
            userIdx: myData.userIdx,
            postIdx: postIdx,
            position: requestType,
          })
          .then((res) => {
            if (res.data.isSuccess) {
              setPostDetailData((prevState) => {
                if (!prevState) return null;
                return { ...prevState, requested: true };
              });
            } else errorAlarm(res.data.message);
          })
          .catch((err) => console.error(err));
      }
    },
    [postDetailData, myData, requestType]
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
    postDetailsFetcher(`/post/${postIdx}?userIdx=${myData.userIdx}`)
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
          ???????????? ??????????????? ??????????????????.
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
                  <PickerImg src={PickerSvg} />
                  {postDetailData.location != "null" ? (
                    <span>{postDetailData.location}</span>
                  ) : (
                    <span>???????????? ????????????.</span>
                  )}
                </PlaceInfoDiv>
                <TimeInfoDiv>
                  {postDetailData.meetingAt && (
                    <>
                      <span>
                        {dayjsAll(postDetailData.meetingAt).appointmentDate()}
                      </span>
                      <span>
                        {dayjsAll(postDetailData.meetingAt).appointmentTime()}
                      </span>
                    </>
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
            {postDetailData?.requested ? (
              <ColoredBtn
                width={"100%"}
                height={"35px"}
                animate={postDetailData.requested ? "In" : "Out"}
                variants={InNOut}
                useTap={!!postDetailData}
                useHover={!!postDetailData}
                onClick={onClickParticipationButton}
                disable={!postDetailData}
              >
                <span>????????????</span>
              </ColoredBtn>
            ) : type === DUTCH ? (
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
                <span>????????????</span>
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
                  <span>buyer ????????????</span>
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
                  <span>receiver ????????????</span>
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
