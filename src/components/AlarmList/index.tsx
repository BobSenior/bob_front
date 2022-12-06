import { AlarmListWrapper, ListModalContainer } from "./style";
import AlarmInfoDiv from "../AlarmInfoDiv";
import Scrollbars from "react-custom-scrollbars-2";
import useSWR from "swr";
import { ShownNotice } from "../../types/db";
import React, { Dispatch } from "react";
import { getFetcher } from "../../utils/fetchers";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { testUserIdx } from "../../pages/Main";

const test: ShownNotice = {
  postIdx: 1,
  type: "PAIRequest",
  unreadChatNum: 9,
};
const ListAlarm = (props: {
  setShow: Dispatch<React.SetStateAction<number>>;
}) => {
  const { data: alarms } = useSWR<ShownNotice[]>(
    `/notice/list?userIdx=${testUserIdx}`,
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
          {alarms?.map((content) => (
            <AlarmInfoDiv key={generateUniqueID()} data={content} />
          ))}
        </Scrollbars>
      </AlarmListWrapper>
    </ListModalContainer>
  );
};

export default ListAlarm;
