import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const useDayjs = (timeStamp: string | number | dayjs.Dayjs | Date) => {
  const hourmin = dayjs(timeStamp).locale("ko").format("HH:MM");
  const fromNow = dayjs(timeStamp).locale("ko").fromNow();

  return { fromNow, hourmin };
};

export default useDayjs;
