import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import calendar from "dayjs/plugin/calendar";
dayjs.locale("ko");
dayjs.extend(calendar);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const dayjsAll = (timeStamp: string | number | dayjs.Dayjs | Date) => {
  const hourmin: string = dayjs(timeStamp).format("A hh:MM");
  const fromNow: string = dayjs(timeStamp).fromNow();
  const appointmentDate = (): string => {
    if (dayjs().isAfter(timeStamp)) return "이미 지난 날이예요.";
    return dayjs(timeStamp).calendar(null, {
      sameDay: "[오늘]",
      nextDay: "[내일]",
      nextWeek: "MMMM DD[일](dd)",
      sameElse: "MMMM DD[일](dd)",
    });
  };
  const appointmentTime = (): string => {
    let result = dayjs(timeStamp).format("HH:mm");
    switch (result) {
      case "10:01":
        result = "아침";
        break;
      case "14:01":
        result = "점심";
        break;
      case "20:01":
        result = "저녁";
        break;
      default:
        result = dayjs(timeStamp).format("A hh:mm");
        break;
    }
    return result;
  };
  const postDate: string = dayjs(timeStamp).format("YYYY-MM-DD");
  return { fromNow, hourmin, appointmentDate, appointmentTime, postDate };
};

export default dayjsAll;
