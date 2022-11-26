import React, {Dispatch, SetStateAction} from "react";
import {MajorSpan} from "../MemberBtn/style";
import HashColoredSpanBtn from "../../assets/buttons/HashColoredSpanBtn";
import {Dealt, Progress, VoteSpan} from "./styles";
import HashSpanBtn from "../../assets/buttons/HashSpanBtn";

const VoteRecordBtn = (recordData : {
    id:number;
    content:string;
    count:number;
    total:number;
    onClick:(number:number)=>void;

}) =>{

    const handle = ()=>{
        recordData.onClick(recordData.id);
    }

    const dealt = Math.floor((recordData.count / recordData.total) * 100);

    return (
        <div>
            <HashSpanBtn
                coloringText={recordData.content}
                onClick={(e) => {
                    e.stopPropagation();
                    handle();
                }}
            >
                <span>{recordData.content}</span>
                <VoteSpan>
                    {`(${recordData.count}명)`}
                </VoteSpan>
                <Progress>
                    <Dealt dealt={dealt} />
                </Progress>
            </HashSpanBtn>
        </div>
    )
}

export default VoteRecordBtn;