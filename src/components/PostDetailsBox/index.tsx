/** @jsxImportSource @emotion/react */
import React, {
  useCallback,
  useContext,
  useState,
  MouseEvent,
  useEffect,
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
  TitleHeader,
  TNPSection,
  MembersColumn,
} from "./style";
import {
  AppointmentHeadDTO,
  BaseResponse,
  PostViewDTO,
  SimplifiedUserProfileDTO,
} from "../../types/db";
import ColorHash from "color-hash";
import PickerSvg from "../../assets/icons/location-outline.svg";
import ColoredBtn from "../../assets/buttons/ColoredBtn";
import GlobalContext from "../../hooks/GlobalContext";
import MemberBtn from "../MemberBtn";
import axios from "axios";
import { getFetcher } from "../../utils/fetchers";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import dayjsAll from "../../utils/dayjsAll";

interface props {
  postIdx: number;
}

const PostDetailsBox = ({ postIdx }: props) => {
  const [postDetailData, setPostDetailData] = useState<PostViewDTO | null>(
    null
  );
  const [isError, setError] = useState<boolean>(false);
  const [participateIn, setParticipateIn] = useState(false);
  const { setShowMapModal, setAddress } = useContext(GlobalContext);

  //TODO: 1. 이미 참가 완료된 상태 분리 2. buyer하고 receiver하고 따로 불가능한가요?

  const onClickParticipationButton = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      console.log(e);
      e.stopPropagation();
      setParticipateIn((prevState) => {
        if (prevState) {
          //TODO:참가 신청 취소 API 연결 필요
          axios.post(`/post/request/reverse`, {
            userIdx: 11,
            postIdx: postIdx,
          });
        } else {
          //TODO:참가 신청 API 연결 필요
          axios.post("/post/request", {
            userIdx: 11,
            postIdx: postIdx,
            position: "buyer",
          });
        }
        return !prevState;
      });
    },
    [postDetailData]
  );

  const onClickPlaceInfoDiv = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (postDetailData) {
        setAddress(postDetailData.location ? postDetailData.location : "");
        setShowMapModal(true);
      }
    },
    [postDetailData]
  );

  useEffect(() => {
    getFetcher
      .get(`/post/${postIdx}`, { timeout: 5000 })
      .then((res) => {
        console.log(res);
        setPostDetailData(res.data);
      })
      .catch((err) => {
        console.log(err);
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
            <div>
              {postDetailData ? (
                <>
                  <span
                    style={{
                      backgroundColor: new ColorHash().hex(
                        postDetailData.groupConstraint
                      ),
                    }}
                    css={TitleHeader}
                  >
                    {postDetailData.groupConstraint}
                  </span>
                  <span>{postDetailData.title}</span>
                </>
              ) : (
                <SkeletonTheme height={"1.2em"}>
                  <Skeleton width={"50px"} />
                  <Skeleton width={"200px"} />
                </SkeletonTheme>
              )}
            </div>
          </Section>
          <Section css={TNPSection}>
            {!postDetailData ? (
              <>
                <PlaceInfoDiv
                  whileTap={{ scale: 0.85 }}
                  onClick={onClickPlaceInfoDiv}
                >
                  <PickerImg src={PickerSvg} />
                  <span>{""}</span>
                </PlaceInfoDiv>
                <TimeInfoDiv>
                  <span>{dayjsAll("2022-11-30").appointmentDate}</span>
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
                <h4>receivers</h4>
                <MemberBtn
                  userIdx={1}
                  nickName={"123"}
                  department={"23"}
                  schoolId={23}
                />
                <MemberBtn
                  userIdx={1}
                  nickName={"123"}
                  department={"23"}
                  schoolId={23}
                />
              </MembersColumn>
              <MembersColumn>
                <h4>buyers</h4>
                <MemberBtn
                  userIdx={1}
                  nickName={"123"}
                  department={"23"}
                  schoolId={23}
                />
                <MemberBtn
                  userIdx={1}
                  nickName={"123"}
                  department={"23"}
                  schoolId={23}
                />
              </MembersColumn>
            </MembersDiv>
          </Section>
          <Section css={ContentSection}>
            <h1>Contents</h1>
            <p>
              {postDetailData ? (
                postDetailData.contents
              ) : (
                <div style={{ padding: "5px", height: "50px" }}>
                  <Skeleton height={"0.9em"} width={"200px"} count={3} />
                </div>
              )}
            </p>
          </Section>
          <Footer>
            <ColoredBtn
              width={"100%"}
              height={"35px"}
              animate={participateIn ? "In" : "Out"}
              variants={InNOut}
              useTap={!!postDetailData}
              onClick={onClickParticipationButton}
              disable={!postDetailData}
            >
              <span>{participateIn ? "신청취소" : "참가신청"}</span>
            </ColoredBtn>
          </Footer>
        </>
      )}
    </DetailWrapper>
  );
};

export default PostDetailsBox;
