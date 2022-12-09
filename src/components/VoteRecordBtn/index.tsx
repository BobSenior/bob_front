import React, { Dispatch, SetStateAction, useState } from "react";
import { MajorSpan } from "../MemberBtn/style";
import HashColoredSpanBtn from "../../assets/buttons/HashColoredSpanBtn";
import { Dealt, Progress, VoteSpan } from "./styles";
import HashSpanBtn from "../../assets/buttons/HashSpanBtn";

const VoteRecordBtn = (recordData: {
  id: number;
  content: string;
  count: number;
  total: number;
  onClick: (number: number) => void;
  selected: number;
}) => {
  const [selected, setSelected] = useState(false);

  const handle = () => {
    recordData.onClick(recordData.id);
  };

  const dealt = Math.floor((recordData.count / recordData.total) * 100);

  return (
    <div
      style={
        recordData.selected === recordData.id
          ? {
              backgroundColor: "white",
              border: "5px solid red",
              borderRadius: "10px",
              height: "50px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }
          : {}
      }
    >
      <HashSpanBtn
        coloringText={recordData.content}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(true);
          handle();
        }}
      >
        <span>{recordData.content}</span>
        <VoteSpan>{`(${recordData.count}명)`}</VoteSpan>
        <Progress>
          <Dealt dealt={dealt} />
        </Progress>
      </HashSpanBtn>
    </div>
  );
};

export default VoteRecordBtn;
