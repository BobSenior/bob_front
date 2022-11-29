import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "../Modal";
import React, { Dispatch, useEffect, useMemo, useState } from "react";
import dayjsAll from "../../utils/dayjsAll";
import dayjs from "dayjs";
import { SendButton } from "../ChatBox/styles";
import {
  Handle,
  HandleVariant,
  SwitchDiv,
  SwitchVariant,
} from "../../pages/Compose/style";
import SendSvg from "../../assets/icons/send-sharp.svg";
import { CalendarHeader, PostDisplay, TimeSetDiv } from "./style";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";

interface Props {
  setShow: Dispatch<React.SetStateAction<boolean>>;
  setMeetingAt: Dispatch<React.SetStateAction<string | null>>;
}

const MeetingAtSetModal = ({ setShow, setMeetingAt }: Props) => {
  const [time, setTime] = useState<string>("20:01");
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [detailTime, setDetailTime] = useState<string>();
  const [selectedDate, onChange] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("20:01");
  const [postDate, setPostDate] = useState<string | null>(
    dayjsAll(selectedDate).postDate + " " + selectedTime
  );
  const [isValid, setValid] = useState<boolean>(false);

  const timeSelects = useMemo(() => {
    let times = new Array<string[]>();

    for (let h = 0; h < 24; h++) {
      let hour = (h > 12 ? h - 12 : h).toString();
      hour = hour.length < 2 ? "0" + hour : hour;
      let type = h > 12 ? "오후" : "오전";
      for (let m = 0; m < 60; m += 15) {
        const value = h.toString() + ":" + m.toString();
        let min = m.toString();
        min = min.length < 2 ? "0" + min : min;
        let display = hour + ":" + min;
        times.push([value, type, display]);
      }
    }
    return times;
  }, []);

  useEffect(() => {
    if (isDetail) {
      setSelectedTime(detailTime ?? "");
    } else {
      setSelectedTime(time);
    }
    setPostDate(dayjsAll(selectedDate).postDate + " " + selectedTime);
    setValid(!dayjs().isAfter(postDate));
  }, [
    selectedDate,
    selectedTime,
    time,
    isDetail,
    detailTime,
    postDate,
    isValid,
  ]);

  return (
    <Modal setShow={setShow}>
      <CalendarHeader>
        <div>
          <PostDisplay>
            <span>시간: </span>
            <strong>
              {isValid && postDate
                ? dayjsAll(postDate).appointmentDate() +
                  " " +
                  dayjsAll(postDate).appointmentTime()
                : "유효하지 않은 날짜입니다."}
            </strong>
          </PostDisplay>
          <TimeSetDiv>
            <div>
              <select
                disabled={isDetail}
                style={{ height: "100%", width: "100px" }}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="20:01">저녁</option>
                <option value="14:01">점심</option>
                <option value="10:01">아침</option>
              </select>
            </div>
            <SwitchDiv
              id={isDetail ? "off" : "on"}
              animate={"on"}
              variants={SwitchVariant}
              onClick={() => {
                setIsDetail((prevState) => !prevState);
              }}
            >
              <Handle layout animate={"on"} variants={HandleVariant} />
            </SwitchDiv>
            <div>
              <select
                disabled={!isDetail}
                value={detailTime}
                style={{ height: "100%", width: "100px" }}
                onChange={(e) => setDetailTime(e.target.value)}
              >
                {timeSelects.map((value) => {
                  return (
                    <option value={value[0]} key={generateUniqueID()}>
                      {value[1] + " " + value[2]}
                    </option>
                  );
                })}
              </select>
            </div>
          </TimeSetDiv>
        </div>
        <SendButton
          aria-label="Send message"
          type="submit"
          disabled={!isValid}
          animate={!isValid ? "off" : "on"}
          variants={HandleVariant}
          transition={{ duration: 0.1 }}
          onClick={() => {
            setMeetingAt(postDate);
            setShow(false);
          }}
        >
          <img src={SendSvg} width={"22px"} height={"22px"} alt={"send"} />
        </SendButton>
      </CalendarHeader>
      <Calendar onChange={onChange} value={selectedDate} minDate={new Date()} />
    </Modal>
  );
};

export default MeetingAtSetModal;
