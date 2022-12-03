import React from "react";
import {RecordInputBox, RecordLabel} from "../../pages/AppointmentSpace/style";

const RecordBox = (data: {
    count: number;
    setRecords:(records: (record: string[]) => string[])=>void;
}) =>{
    return (
        <RecordLabel style={{width:"100%",fontWeight:"bold"}}><>{data.count}번</>
            <RecordInputBox style={{backgroundColor:"ivory",border:"none",paddingLeft:"8px"}} id={`${data.count}`} placeholder={"항목을 입력하세요"} onChange={(e)=>{
                data.setRecords((record:string[])=>[...record.slice(0,data.count-1),e.target.value,...record.slice(data.count)]);
            }}></RecordInputBox></RecordLabel>
    )
}

export default RecordBox;