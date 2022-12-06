import { AlarmListWrapper, ListModalContainer } from "./style";
import AlarmInfoDiv from "../AlarmInfoDiv";
import Scrollbars from "react-custom-scrollbars-2";
import useSWR from "swr";
import { BaseResponse, ShownNotice } from "../../types/db";
import React, {useMemo} from "react";
import { getFetcher } from "../../utils/fetchers";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import AppointmentMemberBtn from "../AppointmentMemberBtn";

const ListAlarm = () => {
  const { data: alarms, error } = useSWR<BaseResponse<ShownNotice[]>>(
    `/notice/list?userIdx=1`,
    getFetcher
  );

  const alarmSpan = useMemo(()=>{
    if(!alarms?.result) return null;

    return alarms.result.map((member) => {
      return (
          <AlarmInfoDiv key={generateUniqueID()} data={member} />
      );
    });

  },[alarms]);

  return (
    <ListModalContainer
      initial={{ opacity: 0, scale: 0, y: -150, x: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0, y: -150, x: 50 }}
    >
      <AlarmListWrapper>
        <Scrollbars>
          {alarmSpan}
        </Scrollbars>
      </AlarmListWrapper>
    </ListModalContainer>
  );
};

export default ListAlarm;
