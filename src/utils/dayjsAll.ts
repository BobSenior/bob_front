import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const dayjsAll = (timeStamp: string | number | dayjs.Dayjs | Date) => {
  const hourmin = dayjs(timeStamp).locale("ko").format("HH:MM");
  const fromNow = dayjs(timeStamp).locale("ko").fromNow();
  const detail = dayjs(timeStamp).locale("ko").format();
  return { fromNow, hourmin, detail };
};

export default dayjsAll;
