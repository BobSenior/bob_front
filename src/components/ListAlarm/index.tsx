import { LisModalContainer } from "./style";
import AlarmInfoDiv from "../AlarmInfoDiv";

const ListAlarm = () => {
  return (
    <LisModalContainer
      initial={{ opacity: 0, scale: 0, y: -70, x: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0, y: -70, x: 30 }}
    >
      <AlarmInfoDiv />
    </LisModalContainer>
  );
};

export default ListAlarm;
