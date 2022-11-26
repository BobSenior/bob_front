import React, {FormEvent, useCallback, useMemo, useState} from "react";
import {
    ComposeForm,
    ComposeMain, ComposeWrapper, Handle, HandleVariant,
    Label,
    MainSpan,
    SpanVariant, SubmitButton, SwitchDiv,
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
import {useNavigate} from "react-router-dom";
import {
    BoxSection,
    Commit,
    LocationWrapper, MyPlaceInfoDiv, MyTimeInfoDiv,
    NoOneSpanVote,
    Title,
    TitleWrapper,
    TLSection,
    Top,
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

const AppointmentSpace = ()=>{
    
    const {data:appointment} = useSWR<BaseResponse<AppointmentViewDTO>>(`/appointment/1?userIdx=1`,fetcher);
    const [selected, setSelected] = useState<number>(0);
    const [isSelected, setIsSelected] = useState<boolean>(false);

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

    const receiversSpans = useMemo(() => {
        if (!appointment) return null;
        else if (appointment.result.receivers.length === 0)
            return <NoOneSpan>아무도 없어요.</NoOneSpan>;

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
        if (!appointment) return null;
        else if (appointment.result.records === null || appointment.result.records.length === 0 )
            return <NoOneSpanVote>진행중인 투표가 없습니다...</NoOneSpanVote>;

        return appointment.result.records.map((vote) => {
            return (
                <VoteRecordBtn key={vote.id} onClick={getData} id={vote.id} content={vote.content} count={vote.count} total={appointment.result.maxNum} />
            );
        });
    }, [appointment]);

    const onSubmitVote = useCallback((e:FormEvent)=>{
        e.preventDefault();
        const postIdx=1;
        postFetcher
            .post(`/vote/${postIdx}`,
                {
                    voteIdx:appointment?.result.voteIdx,
                    userIdx:1,
                    voteSelect:selected,
                })
            .then((reason)=>{
                console.log(reason);
            })
    },[selected,isSelected]);





return(
    <ComposeWrapper>
        <ComposeMain>
            <Top>
                <LayoutBtn
                    text={"홈"}
                    onClick={() => {
                        navigate("");
                    }}
                />
                <LayoutBtn
                    text={"채팅"}
                    onClick={() => {
                        navigate(`plans/participating`);
                    }}
                />
            </Top>
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
                    {dayjsAll(appointment.result.meetingAt).appointmentDate()}
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

            <Section>
                <h1 style={{fontSize:"22px"}}>Members</h1>
                <MembersDiv>
                    <MembersColumn>
                        <h4>buyers</h4>
                        {appointment ? (
                            <>{buyersSpans}</>
                        ) : (
                            <Skeleton count={2} height={"0.95em"} width={"75px"} />
                        )}
                    </MembersColumn>
                    <MembersColumn>
                        <h4>receivers</h4>
                        {appointment ? (
                            <>{receiversSpans}</>
                        ) : (
                            <Skeleton count={2} height={"0.95em"} width={"75px"} />
                        )}
                    </MembersColumn>
                </MembersDiv>
            </Section>
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
        </ComposeMain>
    </ComposeWrapper>
)


}
export default AppointmentSpace;