import React, {useState} from "react";
import {LabelWrapper} from "./style";

const RecordFixBox = (data: {
    count: number;
    setRecords:(records: (record: string[]) => string[])=>void;
}) =>{
    const [showLocation,setShowLocation] = useState<boolean>(false);
    return(
    <LabelWrapper>
        <button>찬성</button>
        <button>반대</button>
    </LabelWrapper>
    );
}

export default RecordFixBox;