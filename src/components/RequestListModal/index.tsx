import React, {useCallback, useMemo} from "react";
import useSWR, {mutate} from "swr";
import {fetcher, postFetcher} from "../../utils/fetchers";
import {BaseResponse, RequestData, SimplifiedUserProfileDTO} from "../../types/db";
import {NoOneSpan} from "../PostDetailsBox/style";
import AppointmentMemberBtn from "../AppointmentMemberBtn";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {RequestLabel} from "./style";
import HorizonLine from "../Horizon";
import {useLinkClickHandler} from "react-router-dom";
import {AxiosResponse} from "axios";
import {toast} from "react-toastify";

const RequestListModal =(data:{
    postIdx:string|undefined;
    currUserIdx:number;
    mutator:()=>void;
}) =>{
    console.log("data",data)

    const {data:ReqList,mutate} = useSWR<BaseResponse<RequestData[]>>(`/post/request/waiting/${data.postIdx}?userIdx=${data.currUserIdx}`,fetcher);

    const onClickAccept = useCallback((userIdx:number)=>{
        postFetcher.post(
            `/appointment/determine/${data.postIdx}`,
            {
                makerIdx:data.currUserIdx,
                requesterIdx:userIdx,
                accept:true
            }
        ).then((response:AxiosResponse<BaseResponse<any>>)=>{
            if(!response.data.isSuccess){
                toast.error(response.data.message)
            }
            else{
                mutate();
                data.mutator();
            }
        })
    },[data])

    const onClickReject = useCallback((userIdx:number)=>{
        postFetcher.post(
            `/appointment/determine/${data.postIdx}`,
            {
                makerIdx:data.currUserIdx,
                requesterIdx:userIdx,
                accept:false
            }
        ).then((response:AxiosResponse<BaseResponse<any>>)=>{
            if(!response.data.isSuccess){
                toast.error(response.data.message)
            }
            else{
                mutate();
                data.mutator();
            }
        })
    },[data])



    const requestSpan = useMemo(() => {
        if (!ReqList) return null;
        else if (ReqList.result.length === 0)
            return <NoOneSpan>현재 요청이 없습니다</NoOneSpan>;
        console.log(ReqList.result.length)
        return ReqList.result.map((reqData) => {
            return (
                <RequestLabel>
                    <AppointmentMemberBtn
                        userIdx={reqData.simp.userIdx}
                        nickName={reqData.simp.nickname}
                        department={reqData.simp.department}
                        schoolId={reqData.simp.schoolId}
                        isOwner={false}
                        key={generateUniqueID()}
                        />
                    <div style={{fontSize:"13px",paddingTop:"2px",marginLeft:'8px',fontWeight:"bold",marginRight:"40px"}}>{"position :    " + reqData.position}</div>
                    <button style={{backgroundColor:"cornflowerblue",borderRadius:"15px",height:"30px",cursor:"pointer",width:"50px",fontSize:"20px",fontWeight:"bold",border:"none",marginLeft:"40px"}}
                    onClick={()=>onClickAccept(reqData.simp.userIdx)}>v</button>
                    <button style={{backgroundColor:"indianred",borderRadius:"15px",height:"30px",cursor:"pointer",width:"50px",fontSize:"20px",fontWeight:"bold",border:"none",marginLeft:"5px"}}
                   onClick={()=>onClickReject(reqData.simp.userIdx)}>x</button>
                </RequestLabel>
            );
        });
    }, [ReqList,data]);


    return(
        <div>
            <div style={{fontSize:'22px',fontWeight:"bold",marginTop:"8px",marginBottom:"8px"}}>참가 목록</div>
            <div
                style={{
                    width: "100%",
                    left: "5%",
                    marginTop: "30px",
                    textAlign: "center",
                    borderBottom: "1px solid #aaa",
                    lineHeight: "0.1em",
                    margin: "10px 0 20px",
                }}
            />
        {requestSpan}
        </div>
            );
}

export default RequestListModal;