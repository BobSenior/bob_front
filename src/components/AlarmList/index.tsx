import { AlarmListWrapper, ListModalContainer, NoAlarmDiv } from "./style";
import AlarmInfoDiv from "../AlarmInfoDiv";
import Scrollbars from "react-custom-scrollbars-2";
import useSWR from "swr";
import { ShownNotice } from "../../types/db";
import React, {Dispatch, useContext} from "react";
import { getFetcher } from "../../utils/fetchers";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import GlobalContext from "../../hooks/GlobalContext";

const ListAlarm = (props: {
  setShow: Dispatch<React.SetStateAction<number>>;
}) => {
  const { myData } = useContext(GlobalContext);
  const { data: alarms } = useSWR<ShownNotice[]>(
    `/notice/list?userIdx=${myData?.userIdx}`,
    getFetcher
  );

  return (
    <ListModalContainer
      initial={{ opacity: 0, scale: 0, y: -150, x: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0, y: -150, x: 50 }}
      onClick={() => props.setShow(0)}
    >
      <AlarmListWrapper>
        <Scrollbars>
          {alarms && alarms.length > 0 ? (
            alarms.map((content) => (
              <AlarmInfoDiv key={generateUniqueID()} data={content} />
            ))
          ) : (
            <NoAlarmDiv>
              {" "}
              <span>알람이 없습니다.</span>
            </NoAlarmDiv>
          )}
        </Scrollbars>
      </AlarmListWrapper>
    </ListModalContainer>
  );
};

export default ListAlarm;
