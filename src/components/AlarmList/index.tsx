import { AlarmListWrapper, ListModalContainer } from "./style";
import AlarmInfoDiv from "../AlarmInfoDiv";
import Scrollbars from "react-custom-scrollbars-2";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {BaseResponse, ShownNotice} from "../../types/db";
import HashTag from "../HashTag";
import React from "react";

const ListAlarm = () => {
  const {data:alarms,error} = useSWR<BaseResponse<ShownNotice[]>>(`/notice/list?userIdx=1`,fetcher);

  return (
    <ListModalContainer
      initial={{ opacity: 0, scale: 0, y: -150, x: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0, y: -150, x: 50 }}
    >
      <AlarmListWrapper>
        <Scrollbars>
          {alarms?.result.map((content)=>(<AlarmInfoDiv key={content.noticeIdx} data={content} />))}
        </Scrollbars>
      </AlarmListWrapper>
    </ListModalContainer>
  );
};

export default ListAlarm;
