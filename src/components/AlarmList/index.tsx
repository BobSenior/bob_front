import { AlarmListWrapper, ListModalContainer } from "./style";
import AlarmInfoDiv from "../AlarmInfoDiv";
import Scrollbars from "react-custom-scrollbars-2";

const ListAlarm = () => {
  return (
    <ListModalContainer
      initial={{ opacity: 0, scale: 0, y: -150, x: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0, y: -150, x: 50 }}
    >
      <AlarmListWrapper>
        <Scrollbars>
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
          <AlarmInfoDiv />
        </Scrollbars>
      </AlarmListWrapper>
    </ListModalContainer>
  );
};

export default ListAlarm;
