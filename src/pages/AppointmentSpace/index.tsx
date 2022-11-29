import React, {FormEvent, useCallback, useMemo, useState} from "react";
import {
    ComposeForm,
    ComposeMain, ComposeWrapper, Handle, HandleVariant,
    Label,
    MainSpan,
    SpanVariant, SwitchDiv,
    SwitchSpan, SwitchVariant,
    SwitchWrapper,
    TextArea
} from "../Compose/style";
import {Input} from "../../components/SearchBar/style";
import {HashTagContainer} from "../../components/PostBox/style";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import RangeInput from "../../components/RangeInput";
import LayoutBtn from "../../assets/buttons/LayoutBtn";
import {Bottom} from "../../layouts/MainLayout/style";
import {useNavigate, useParams} from "react-router-dom";
import {
    AddButton,
    BottomButton,
    BottomButtonSection,
    BoxSection,
    Commit, InviteBuyerButton, KickButton, LargeMembersDiv,
    LocationWrapper, MakeVoteButton, MemberSection, MyPlaceInfoDiv, MyTimeInfoDiv,
    NoOneSpanVote, PlusButton, RecordInputBox, RecordLabel,
    Title,
    TitleWrapper,
    TLSection,
    Top, UserButtonWrapper, VoteRecordSection, VoteSection,
    VoteSequence
} from "./style";
import HorizonLine from "../../components/Horizon";
import useSWR from "swr";
import {AppointmentViewDTO, BaseResponse} from "../../types/db";
import {fetcher, postFetcher} from "../../utils/fetchers";
import app from "../../App";
import {
    MembersColumn,
    MembersDiv, NoOneSpan,
    PickerImg,
    PlaceInfoDiv,
    Section,
    TimeInfoDiv,
    TNPSection
} from "../../components/PostDetailsBox/style";
import PickerSvg from "../../assets/icons/location-outline.svg";
import dayjsAll from "../../utils/dayjsAll";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import MemberBtn from "../../components/MemberBtn";
import VoteRecordBtn from "../../components/VoteRecordBtn";
import {CommitButton} from "../../layouts/AppointmentLayout/style";
import {AxiosResponse} from "axios";
import {toast} from "react-toastify";
import AppointmentMemberBtn from "../../components/AppointmentMemberBtn";
import Modal from "../../components/Modal";
import CenterModal from "../../components/CenterModal";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

const AppointmentSpace = ()=>{


    const {id} = useParams();
    const {data:appointment,mutate} = useSWR<BaseResponse<AppointmentViewDTO>>(`/appointment/${id}?userIdx=1`,fetcher);
    const [selected, setSelected] = useState<number>(0);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [onInvite, setOnInvite] = useState<boolean>(false);
    const [inputUUID, setInputUUID]= useState<string>("");
    const [invitedPosition, setInvitedPosition] = useState<string>("");
    const [onMakeVote, setOnMakeVote] = useState<boolean>(false);
    const [records, setRecords] = useState<string[]>([]);
    const [numRecord, setNumRecord] = useState<number>(2);
    const [recordsDate, setRecordsDate] = useState<String[]>([]);




    const navigate = useNavigate();

    const getData = (number:number)=>{
        setIsSelected(true);
        setSelected(number);
    }
    


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

    const remainsBuyer = useMemo(()=>{
        if(!appointment) return null;
        else if(appointment.result.buyers.length>=appointment.result.maxBuyerNum) return null;
        else if(appointment.result.buyers.length<appointment.result.maxBuyerNum){
            let remains_buyer = appointment.result.maxBuyerNum - appointment.result.buyers.length;
            let remaining = [];
            for(remains_buyer;remains_buyer>0;remains_buyer--){
                remaining.push(<InviteBuyerButton onClick={()=>{setOnInvite(true);setInvitedPosition("buyer")}}>+</InviteBuyerButton>);
            }
            return remaining;
        }
    },[appointment]);

    const remainsReceiver = useMemo(()=>{
        console.log(appointment?.result.maxReceiverNum);
        if(!appointment) return null;
        else if(appointment.result.receivers.length>=appointment.result.maxReceiverNum) return null;
        else if(appointment.result.receivers.length<appointment.result.maxReceiverNum){
            let remains_receiver = appointment.result.maxReceiverNum - appointment.result.receivers.length;
            let remainings = [];
            for(remains_receiver;remains_receiver>0;remains_receiver--){
                remainings.push(<InviteBuyerButton onClick={()=>{setOnInvite(true);setInvitedPosition("receiver")}}>+</InviteBuyerButton>);
            }
            return remainings;
        }
    },[appointment]);

    const receiversSpans = useMemo(() => {
        if (!appointment) return null;
        else if (appointment.result.receivers.length === 0)
            return null;

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
        else if (appointment.result.records === null || appointment.result.records.length === 0 ){
            if(appointment.result.writerIdx === userIdx){
                return <MakeVoteButton onClick={()=>setOnMakeVote(true)}>새 투표 만들기</MakeVoteButton>
            }
            return <NoOneSpanVote>진행중인 투표가 없습니다...</NoOneSpanVote>;
        }

        return (appointment.result.records.map((vote) => {
            return (
                <VoteRecordBtn key={vote.id} onClick={getData} id={vote.id} content={vote.content} count={vote.count} total={appointment.result.maxNum} selected={selected}/>
            );
        }));
    }, [appointment,selected]);

    const voteRecordSpan = useMemo(()=>{
        if(!appointment) return null;
        let remainings = [];
        let buf = numRecord;
        let count = 1;
        for(buf;buf>0;buf--){
            remainings.push(<RecordLabel><>{count}번</>
                <RecordInputBox id={`${count}`} placeholder={"항목을 입력하세요"}></RecordInputBox></RecordLabel>);
            count++;
        }
        return remainings;


    },[appointment, numRecord]);

    const onSubmitVote = useCallback((e:FormEvent)=>{
        e.preventDefault();
        const postIdx=1;
        postFetcher
            .post(`/vote/${id}`,
                {
                    voteIdx:appointment?.result.voteIdx,
                    userIdx:1,
                    voteSelect:selected,
                })
            .then((reason:AxiosResponse<BaseResponse<any>>)=>{
                if(!reason.data.isSuccess){
                    toast.error(reason.data.message);
                }
                else{
                    navigate(`/main`);
                }

            })
    },[selected,isSelected]);

    const onClickExit = useCallback(() =>{
        postFetcher
            .post(`/appointment/leave/${id}`,
                {
                 userIdx:1,
                }).then((reason:AxiosResponse<BaseResponse<any>>) =>{
                    if(!reason.data.isSuccess){
                        toast.error(reason.data.message);
                    }
                    else{
                        navigate('/main');
                    }
        })
    },[appointment]);

    const onClickInviteBuyer = useCallback(()=>{
        postFetcher.post(
            `/appointment/invite/${id}`,
            {
                inviterIdx:1,
                invitedUUID:inputUUID,
                position : invitedPosition,
            }
        ).then((reason:AxiosResponse<BaseResponse<any>>)=>{
            if(!reason.data.isSuccess){
                toast.error(reason.data.message);
            }
            else{
                toast.info("초대가 완료되었습니다!");
            }
        }).finally(()=>{
            setOnInvite(false);
            mutate();
        })
    },[appointment, inputUUID,invitedPosition]);





return(
    <ComposeWrapper>
        <ComposeMain>
            <TitleWrapper style={{marginTop:"100px"}}> <Title>[{appointment?.result.constraint==='ANY'?'아무나':appointment?.result.constraint}]{appointment?.result.title}</Title></TitleWrapper>
            <HorizonLine text={"hello"}/>

            <TLSection css={TNPSection}>
                {appointment ? (
                    <LocationWrapper>
                        <MyPlaceInfoDiv
                            whileTap={{ scale: 0.85 }}
                        >
                            <PickerImg src={PickerSvg} />
                            <span>{appointment.result.location}</span>
                        </MyPlaceInfoDiv>
                        <MyTimeInfoDiv>
                  <span>

                  </span>
                        </MyTimeInfoDiv>
                    </LocationWrapper>
                ) : (
                    <SkeletonTheme width={"70px"} height={"1.5em"}>
                        <Skeleton />
                        <Skeleton />
                    </SkeletonTheme>
                )}
            </TLSection>
            <HorizonLine text={''}/>

            <MemberSection>
                <h1 style={{fontSize:"33px"}}>Members</h1>
                <LargeMembersDiv>
                    <MembersColumn style={{paddingLeft:"10px"}}>
                        <h4>buyers</h4>
                        {appointment ? (
                            <><>{buyersSpans}</>
                                <>{remainsBuyer}</>
                            </>
                        ) : (
                            <Skeleton count={2} height={"0.95em"} width={"75px"} />
                        )}
                    </MembersColumn>
                    <MembersColumn>
                        <h4>receivers</h4>
                        {appointment ? (
                            <><>{receiversSpans}</>
                                <>{remainsReceiver}</>
                            </>
                        ) : (
                            <Skeleton count={2} height={"0.95em"} width={"75px"} />
                        )}
                    </MembersColumn>
                </LargeMembersDiv>

                <CenterModal isVisible={onMakeVote} onClickForClose={()=>{setOnMakeVote(false); setNumRecord(2); setRecords([])}}>
                    <VoteSection><div>selector area</div>
                    <div style={{fontWeight:"bold",fontSize:"22px"}}>투표 제목</div>
                    <RecordInputBox style={{width:"90%",marginLeft:"5%"}} placeholder={"제목을 입력하세요"}></RecordInputBox>
                    <div style={{fontWeight:"bold",marginBottom:"10px",marginTop:"10px"}}>항목 입력</div>
                    <VoteRecordSection>
                        {voteRecordSpan}
                    </VoteRecordSection>
                    <PlusButton onClick={()=>setNumRecord(numRecord+1)}>+</PlusButton>
                    </VoteSection>
                </CenterModal>

                <CenterModal isVisible={onInvite} onClickForClose={()=>{setOnInvite(false); setInputUUID(""); setInvitedPosition("")}}>
                    <label style={{fontSize:"22px",fontWeight:"bold"}}>초대하기({invitedPosition}) : </label>
                    <Input placeholder={"uuid"} onChange={(e)=>setInputUUID(e.target.value)}></Input>
                    <AddButton onClick={onClickInviteBuyer}>+</AddButton>
                </CenterModal>
            </MemberSection>
            <HorizonLine text={''}/>
            <Title style={{paddingTop:"1px"}}>VOTE</Title>
            <BoxSection>
                {appointment?(<>
                    <VoteSequence style={{color:"black"}}>{appointment.result.voteTitle}</VoteSequence>
                    <>{voteSpan}</>
                    {appointment.result.records !== null && appointment.result.records.length>0 && 
                        <Commit 
                        type={"submit"}
                        disabled={!isSelected}
                        animate={isSelected?"on":"off"}
                        variants={HandleVariant}
                        onClick={onSubmitVote}
                        >투표하기</Commit>}
                </>)  : (
                    <Skeleton count={2} height={"0.95em"} width={"75px"} />
                    )}
            </BoxSection>
            <BottomButtonSection>
                <BottomButton onClick={onClickExit}>나가기</BottomButton>
                <BottomButton onClick={()=>navigate(`/main`)}>메인으로</BottomButton>
                <BottomButton onClick={()=>navigate(`/main/chat_test`)}>채팅방으로</BottomButton>
            </BottomButtonSection>
        </ComposeMain>
    </ComposeWrapper>
)


}
export default AppointmentSpace;