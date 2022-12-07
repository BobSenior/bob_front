import React, { FormEvent, useCallback, useMemo, useState } from "react";
import {
  ComposeForm,
  ComposeMain,
  ComposeWrapper,
  Handle,
  HandleVariant,
  Label,
  LAM_Variant,
  LAMButton,
  LAMDetailsSpan,
  MainSpan,
  ResultSpan,
  SpanVariant,
  SwitchDiv,
  SwitchSpan,
  SwitchVariant,
  SwitchWrapper,
  TextArea,
} from "../Compose/style";
import { Input } from "../../components/SearchBar/style";
import { HashTagContainer } from "../../components/PostBox/style";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import RangeInput from "../../components/RangeInput";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import { Bottom } from "../../layouts/MainLayout/style";
import { useLinkClickHandler, useNavigate, useParams } from "react-router-dom";
import {
  AddButton,
  BottomButton,
  BottomButtonSection,
  BoxSection,
  Commit,
  FixLabel,
  InviteBuyerButton,
  KickButton,
  LAMButtonVote,
  LargeMembersDiv,
  LocationWrapper,
  MakeVoteButton,
  MemberSection,
  MyPlaceInfoDiv,
  MyTimeInfoDiv,
  NoOneSpanVote,
  PlaceButton,
  PlusButton,
  PrevButton,
  RecordInputBox,
  RecordLabel,
  RemainsButton,
  SpaceInput,
  Title,
  TitleWrapper,
  TLSection,
  Top,
  UserButtonWrapper,
  VoteRecordSection,
  VoteSection,
  VoteSequence,
} from "./style";
import HorizonLine from "../../components/Horizon";
import useSWR from "swr";
import { AppointmentViewDTO, BaseResponse, ICoordinate } from "../../types/db";
import { fetcher, postFetcher } from "../../utils/fetchers";
import app from "../../App";
import {
  MembersColumn,
  MembersDiv,
  NoOneSpan,
  PickerImg,
  PlaceInfoDiv,
  Section,
  TimeInfoDiv,
  TNPSection,
} from "../../components/PostDetailsBox/style";
import PickerSvg from "../../assets/icons/location-outline.svg";
import dayjsAll from "../../utils/dayjsAll";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import MemberBtn from "../../components/MemberBtn";
import VoteRecordBtn from "../../components/VoteRecordBtn";
import { CommitButton } from "../../layouts/AppointmentLayout/style";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import AppointmentMemberBtn from "../../components/AppointmentMemberBtn";
import Modal from "../../components/Modal";
import CenterModal from "../../components/CenterModal";
import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;
import RecordBox from "../../components/RecordBox";
import RecordFixBox from "../../components/RecordFixBox";
import LocationSetModal from "../../components/LocationSetModal";
import MeetingAtSetModal from "../../components/MeetingAtSetModal";
import RequestListModal from "../../components/RequestListModal";
import MapDisplayModal from "../../components/MapDisplayModal";
import useMySWR from "../../data/useMySWR";
import ChatRoomModal from "../../components/ChatRoomModal";

const AppointmentSpace = () => {
  const { id } = useParams();
  const { data: appointment, mutate } = useSWR<
    BaseResponse<AppointmentViewDTO>
  >(`/appointment/${id}?userIdx=1`, fetcher);
  const [selected, setSelected] = useState<number>(0);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [onInvite, setOnInvite] = useState<boolean>(false);
  const [inputUUID, setInputUUID] = useState<string>("");
  const [invitedPosition, setInvitedPosition] = useState<string>("");
  const [onMakeVote, setOnMakeVote] = useState<boolean>(false);
  const [records, setRecords] = useState<string[]>(["", ""]);
  const [numRecord, setNumRecord] = useState<number>(2);
  const [recordsDate, setRecordsDate] = useState<String[]>([]);
  const [voteMode, setVoteMode] = useState<boolean>(true);
  const [voteTitle, setVoteTitle] = useState<String>("");
  const [showLocator, setShowLocator] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [location, setLocation] = useState<string | null>(null);
  const [coords, setCoords] = useState<ICoordinate | null>(null);
  const [meetingAt, setMeetingAt] = useState<string | null>(null);
  const [requestModal, setRequestModal] = useState<boolean>(false);
  const [showingChat, setShowingChat] = useState<boolean>(false);

  console.log(records);

  const navigate = useNavigate();

  const getData = (number: number) => {
    setIsSelected(true);
    setSelected(number);
  };

  const buyersSpans = useMemo(() => {
    if (!appointment) return null;
    else if (appointment.result.buyers.length === 0)
      return <NoOneSpan>아무도 없어요.</NoOneSpan>;

    return appointment.result.buyers.map((member) => {
      return (
        <AppointmentMemberBtn
          userIdx={member.userIdx}
          nickName={member.nickname}
          department={member.department}
          schoolId={member.schoolId}
          isOwner={appointment.result.writerIdx === 1}
          key={generateUniqueID()}
        />
      );
    });
  }, [appointment]);

  const remainsBuyer = useMemo(() => {
    if (!appointment) return null;
    else if (appointment.result.buyers.length >= appointment.result.maxBuyerNum)
      return null;
    else if (
      appointment.result.buyers.length < appointment.result.maxBuyerNum
    ) {
      let remains_buyer =
        appointment.result.maxBuyerNum - appointment.result.buyers.length;
      let remaining = [];
      for (remains_buyer; remains_buyer > 0; remains_buyer--) {
        remaining.push(
          <InviteBuyerButton
            onClick={() => {
              setOnInvite(true);
              setInvitedPosition("buyer");
            }}
          >
            +
          </InviteBuyerButton>
        );
      }
      return remaining;
    }
  }, [appointment]);

  const remainsReceiver = useMemo(() => {
    console.log(appointment?.result.maxReceiverNum);
    if (!appointment) return null;
    else if (
      appointment.result.receivers.length >= appointment.result.maxReceiverNum
    )
      return null;
    else if (
      appointment.result.receivers.length < appointment.result.maxReceiverNum
    ) {
      let remains_receiver =
        appointment.result.maxReceiverNum - appointment.result.receivers.length;
      let remainings = [];
      for (remains_receiver; remains_receiver > 0; remains_receiver--) {
        remainings.push(
          <InviteBuyerButton
            onClick={() => {
              setOnInvite(true);
              setInvitedPosition("receiver");
            }}
          >
            +
          </InviteBuyerButton>
        );
      }
      return remainings;
    }
  }, [appointment]);

  const receiversSpans = useMemo(() => {
    if (!appointment) return null;
    else if (appointment.result.receivers.length === 0) return null;

    return appointment.result.receivers.map((member) => {
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
  }, [appointment]);

  const voteSpan = useMemo(() => {
    let userIdx = 1;
    if (!appointment) return null;
    else if (
      appointment.result.records === null ||
      appointment.result.records.length === 0
    ) {
      if (appointment.result.writerIdx === userIdx) {
        return (
          <MakeVoteButton onClick={() => setOnMakeVote(true)}>
            새 투표 만들기
          </MakeVoteButton>
        );
      }
      return <NoOneSpanVote>진행중인 투표가 없습니다...</NoOneSpanVote>;
    }

    return appointment.result.records.map((vote) => {
      return (
        <VoteRecordBtn
          key={vote.id}
          onClick={getData}
          id={vote.id}
          content={vote.content}
          count={vote.count}
          total={appointment.result.maxNum}
          selected={selected}
        />
      );
    });
  }, [appointment, selected]);

  const voteRecordSpan = useMemo(() => {
    if (!appointment) return null;
    let remainings = [];
    let buf = numRecord;
    let count = 1;
    for (buf; buf > 0; buf--) {
      remainings.push(<RecordBox count={count} setRecords={setRecords} />);
      count++;
    }
    return remainings;
  }, [appointment, numRecord]);

  const ReqList = useMemo(() => {
    if (!appointment) return null;
    if (!id) return null;
    return (
      <RequestListModal
        postIdx={id}
        currUserIdx={1}
        mutator={mutate}
      ></RequestListModal>
    );
  }, [appointment, id]);

  const VoteFixRecordSpan = useMemo(() => {
    if (!appointment) return null;
    if (!appointment.result.fixVote) return null;
    if (!appointment.result.voteTitle) return null;
    console.log("title", appointment.result.voteTitle);
    let words = appointment.result.voteTitle.split("$");
    return (
      <>
        <div>{"장소 :" + words[0]}</div>
        <div>{"시간 : " + words[1]}</div>
      </>
    );
  }, [appointment]);

  const onSubmitVote = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const postIdx = 1;
      postFetcher
        .post(`/vote/${id}`, {
          voteIdx: appointment?.result.voteIdx,
          userIdx: 1,
          voteSelect: selected,
        })
        .then((reason: AxiosResponse<BaseResponse<any>>) => {
          if (!reason.data.isSuccess) {
            toast.error(reason.data.message);
          } else {
            mutate();
          }
        })
        .finally(() => {
          setSelected(0);
        });
    },
    [selected, isSelected]
  );

  const onClickExit = useCallback(() => {
    postFetcher
      .post(`/appointment/leave/${id}`, {
        userIdx: 1,
      })
      .then((reason: AxiosResponse<BaseResponse<any>>) => {
        if (!reason.data.isSuccess) {
          toast.error(reason.data.message);
        } else {
          navigate("/main");
        }
      });
  }, [appointment]);

  const onClickUsePrevLocation = useCallback(() => {
    if (!appointment) return null;
    if (!appointment.result.location) {
      toast.error("설정된 장소가 없습니다! 새로 입력해주세요");
      return null;
    } else {
      if (
        appointment.result.longitude === null ||
        appointment.result.latitude === null
      )
        return null;
      setLocation(appointment.result.location);
      setCoords({
        latitude: appointment.result.latitude,
        longitude: appointment.result.longitude,
      });
      console.log("setted = ", coords);
    }
  }, [appointment]);

  const onClickUsePrevTime = useCallback(() => {
    if (!appointment) return null;
    if (!appointment.result.meetingAt) {
      toast.error("설정된 시간이 없습니다! 새로 입력해주세요");
      return null;
    } else {
      setMeetingAt(appointment.result.meetingAt);
    }
  }, [appointment]);

  const onClickInviteBuyer = useCallback(() => {
    postFetcher
      .post(`/appointment/invite/${id}`, {
        inviterIdx: 1,
        invitedUUID: inputUUID,
        position: invitedPosition,
      })
      .then((reason: AxiosResponse<BaseResponse<any>>) => {
        if (!reason.data.isSuccess) {
          toast.error(reason.data.message);
        } else {
          toast.info("초대가 완료되었습니다!");
        }
      })
      .finally(() => {
        setOnInvite(false);
        setInputUUID("");
        mutate();
      });
  }, [appointment, inputUUID, invitedPosition]);

  const onClickMakeVote = useCallback(() => {
    //TODO : vote생성 검증하기
    let flag = true;
    if (voteTitle.length === 0) {
      flag = false;
    }
    for (let record of records) {
      if (record.length === 0) {
        console.log("record problem");
        flag = false;
        break;
      }
    }
    if (!voteMode) {
      if (meetingAt === null) {
        if (appointment?.result.meetingAt) {
          setMeetingAt(appointment.result.meetingAt);
        } else flag = false;
      }
      if (location === null) {
        if (
          appointment?.result.location &&
          appointment.result.latitude &&
          appointment.result.longitude
        ) {
          setLocation(appointment.result.location);
          setCoords({
            latitude: appointment.result.latitude,
            longitude: appointment.result.longitude,
          });
        } else flag = false;
      }
    }
    console.log(flag);
    if (flag) {
      postFetcher
        .post(`/vote/init/${id}`, {
          makerIdx: 1,
          title: voteTitle,
          contents: records,
          location: voteMode
            ? "normal"
            : location
            ? location
            : appointment?.result.location,
          longitude: voteMode
            ? "normal"
            : coords
            ? coords?.longitude
            : appointment?.result.longitude,
          latitude: voteMode
            ? "normal"
            : coords
            ? coords?.latitude
            : appointment?.result.latitude,
          time: voteMode
            ? "normal"
            : meetingAt
            ? meetingAt
            : appointment?.result.meetingAt,
          voteType: voteMode ? "NORMAL" : "FIX",
        })
        .then((response: AxiosResponse<BaseResponse<any>>) => {
          if (!response.data.isSuccess) {
            toast.error(response.data.message);
          } else {
            toast.info("투표가 개시되었습니다!");
            mutate();
          }
        })
        .finally(() => {
          setRecords(["", ""]);
          setNumRecord(0);
          setVoteMode(true);
          setVoteTitle("");
          setOnMakeVote(false);
          setVoteMode(true);
          setLocation(null);
          setMeetingAt(null);
        });
    } else {
      toast.error("잘못된 입력입니다");
    }
  }, [
    appointment,
    records,
    numRecord,
    voteMode,
    voteTitle,
    location,
    meetingAt,
  ]);

  const onClickTerminateVote = useCallback(() => {
    postFetcher
      .post(`/vote/terminate/${id}`, {
        terminatorIdx: 1,
        voteIdx: appointment?.result.voteIdx,
      })
      .then((response: AxiosResponse<BaseResponse<any>>) => {
        if (!response.data.isSuccess) {
          toast.error(response.data.message);
        } else {
          toast.info("투표가 종료되었습니다!");
        }
        mutate();
      });
  }, [appointment, selected]);

  return (
    <ComposeWrapper>
      <ComposeMain>
        <TitleWrapper style={{ marginTop: "100px" }}>
          {" "}
          <Title>
            [
            {appointment?.result.constraint === "ANY"
              ? "아무나"
              : appointment?.result.constraint}
            ]{appointment?.result.title}
          </Title>
        </TitleWrapper>
        <HorizonLine text={"hello"} />

        <TLSection css={TNPSection}>
          {appointment ? (
            <LocationWrapper>
              <MyPlaceInfoDiv whileTap={{ scale: 0.85 }}>
                <PickerImg src={PickerSvg} />
                <span>{appointment.result.location}</span>
              </MyPlaceInfoDiv>
              <MyTimeInfoDiv>
                <span></span>
              </MyTimeInfoDiv>
            </LocationWrapper>
          ) : (
            <SkeletonTheme width={"70px"} height={"1.5em"}>
              <Skeleton />
              <Skeleton />
            </SkeletonTheme>
          )}
        </TLSection>
        <HorizonLine text={""} />

        <MemberSection>
          <h1 style={{ fontSize: "33px" }}>Members</h1>
          <LargeMembersDiv>
            <MembersColumn style={{ paddingLeft: "10px" }}>
              <h4>buyers</h4>
              {appointment ? (
                <>
                  <>{buyersSpans}</>
                  <>{remainsBuyer}</>
                </>
              ) : (
                <Skeleton count={2} height={"0.95em"} width={"75px"} />
              )}
            </MembersColumn>
            <MembersColumn>
              <h4>receivers</h4>
              {appointment ? (
                <>
                  <>{receiversSpans}</>
                  <>{remainsReceiver}</>
                </>
              ) : (
                <Skeleton count={2} height={"0.95em"} width={"75px"} />
              )}
            </MembersColumn>
          </LargeMembersDiv>

          <CenterModal
            isVisible={onMakeVote}
            onClickForClose={() => {
              setOnMakeVote(false);
              setNumRecord(2);
              setRecords(["", ""]);
              setVoteMode(true);
            }}
          >
            <VoteSection>
              <div>
                <button
                  onClick={() => {
                    setVoteMode(true);
                    setRecords(["", ""]);
                    setNumRecord(2);
                    setMeetingAt(null);
                    setLocation(null);
                  }}
                  style={{
                    backgroundColor: voteMode ? "navajowhite" : "white",
                    width: "50%",
                    border: "none",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  일반
                </button>
                <button
                  onClick={() => {
                    setVoteMode(false);
                    setVoteTitle("fix");
                    setRecords(["찬성", "반대"]);
                    setNumRecord(2);
                    setMeetingAt(null);
                    setLocation(null);
                  }}
                  style={{
                    backgroundColor: voteMode ? "white" : "navajowhite",
                    width: "50%",
                    border: "none",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  약속
                </button>
              </div>
              {showLocator && (
                <LocationSetModal
                  setShow={setShowLocator}
                  setLocation={setLocation}
                  setCoords={setCoords}
                />
              )}
              {showCalendar && (
                <MeetingAtSetModal
                  setShow={setShowCalendar}
                  setMeetingAt={setMeetingAt}
                />
              )}
              {voteMode && (
                <>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "22px",
                      paddingTop: "15px",
                      paddingBottom: "15px",
                      border: "none",
                    }}
                  >
                    투표 제목
                  </div>
                  <RecordInputBox
                    style={{
                      width: "90%",
                      marginLeft: "5%",
                      backgroundColor: "ivory",
                      border: "none",
                      paddingLeft: "8px",
                    }}
                    placeholder={"제목을 입력하세요"}
                    onChange={(e) => setVoteTitle(e.target.value)}
                  ></RecordInputBox>
                </>
              )}

              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                항목 입력
              </div>
              <VoteRecordSection>
                {voteMode ? (
                  voteRecordSpan
                ) : (
                  <label style={{ width: "100%" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "22px",
                        paddingBottom: "13px",
                      }}
                    >
                      장소 선택
                    </label>
                    <LAMButtonVote
                      animate={location ? "on" : "off"}
                      variants={LAM_Variant}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowLocator(true)}
                    >
                      <ResultSpan>
                        {location
                          ? location
                          : appointment?.result.location
                          ? appointment.result.location
                          : "장소가 정해지지 않았어요!"}
                      </ResultSpan>
                      <LAMDetailsSpan>변경할 수 있어요!</LAMDetailsSpan>
                    </LAMButtonVote>
                    <div></div>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "22px",
                        paddingBottom: "13px",
                        width: "100%",
                      }}
                    >
                      시간 선택
                    </label>
                    <LAMButtonVote
                      animate={meetingAt ? "on" : "off"}
                      variants={LAM_Variant}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowCalendar(true)}
                    >
                      <ResultSpan>
                        {meetingAt
                          ? dayjsAll(meetingAt).appointmentDate() +
                            " " +
                            dayjsAll(meetingAt).appointmentTime()
                          : appointment?.result.meetingAt
                          ? dayjsAll(
                              appointment.result.meetingAt
                            ).appointmentDate() +
                            " " +
                            dayjsAll(
                              appointment.result.meetingAt
                            ).appointmentTime()
                          : "아직 시간이 정해지지 않았어요!"}
                      </ResultSpan>
                      <LAMDetailsSpan>변경할 수 있어요!</LAMDetailsSpan>
                    </LAMButtonVote>
                  </label>
                )}
              </VoteRecordSection>
              {voteMode && (
                <PlusButton onClick={() => setNumRecord(numRecord + 1)}>
                  +
                </PlusButton>
              )}
              <BottomButton
                style={{
                  marginBottom: "10px",
                  width: "80%",
                  marginLeft: "10%",
                }}
                onClick={onClickMakeVote}
              >
                submit
              </BottomButton>
            </VoteSection>
          </CenterModal>

          <CenterModal
            isVisible={onInvite}
            onClickForClose={() => {
              setOnInvite(false);
              setInputUUID("");
              setInvitedPosition("");
            }}
          >
            <label style={{ fontSize: "22px", fontWeight: "bold" }}>
              초대하기({invitedPosition}) :{" "}
            </label>
            <Input
              placeholder={"uuid"}
              onChange={(e) => setInputUUID(e.target.value)}
            ></Input>
            <AddButton onClick={onClickInviteBuyer}>+</AddButton>
          </CenterModal>
          <CenterModal
            isVisible={requestModal}
            onClickForClose={() => setRequestModal(false)}
          >
            {ReqList}
          </CenterModal>
        </MemberSection>
        {appointment?.result.writerIdx === 1 && (
          <BottomButton onClick={() => setRequestModal(true)}>
            신청 목록
          </BottomButton>
        )}
        <HorizonLine text={""} />
        <Title style={{ paddingTop: "1px" }}>VOTE</Title>
        <BoxSection>
          {appointment ? (
            <>
              <VoteSequence
                style={{ color: appointment.result.fixVote ? "red" : "black" }}
              >
                {appointment.result.fixVote
                  ? "약속 설정 투표"
                  : appointment.result.voteTitle}
              </VoteSequence>

              {appointment.result.fixVote && VoteFixRecordSpan}
              <>{voteSpan}</>
              {appointment.result.records !== null &&
                appointment.result.records.length > 0 && (
                  <>
                    <Commit
                      type={"submit"}
                      disabled={!isSelected}
                      animate={isSelected ? "on" : "off"}
                      variants={HandleVariant}
                      onClick={onSubmitVote}
                    >
                      투표하기
                    </Commit>
                    {(appointment.result.writerIdx === 1 ||
                      appointment.result.voteOwnerIdx === 1) && (
                      <Commit onClick={onClickTerminateVote}>투표 종료</Commit>
                    )}
                  </>
                )}
            </>
          ) : (
            <Skeleton count={2} height={"0.95em"} width={"75px"} />
          )}
        </BoxSection>
        <BottomButtonSection>
          <BottomButton onClick={onClickExit}>나가기</BottomButton>
          <BottomButton onClick={() => navigate(`/main`)}>
            메인으로
          </BottomButton>
          <BottomButton onClick={() => setShowingChat(true)}>
            채팅방
          </BottomButton>
        </BottomButtonSection>
        {appointment!== undefined && showingChat &&  <ChatRoomModal setShow={setShowingChat} id={appointment.result.postIdx}/>}
      </ComposeMain>
    </ComposeWrapper>
  );
};
export default AppointmentSpace;
