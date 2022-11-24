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
  const hourmin: string = dayjs(timeStamp).format("HH:MM");
  const fromNow: string = dayjs(timeStamp).fromNow();
  const appointmentDate: () => string = (): string => {
    if (dayjs().isAfter(timeStamp)) return "이미 지난 약속이예요.";
    return dayjs(timeStamp).calendar(null, {
      sameDay: "[오늘] A h:mm",
      nextDay: "[내일] A h:mm",
      nextWeek: "MMMM DD[일](dd)",
      sameElse: "MMMM DD[일](dd)",
    });
  };
  return { fromNow, hourmin, appointmentDate };
};

export default dayjsAll;
