import useSWR from "swr";
import { fetcher } from "../utils/fetchers";

const useMySWR = () => {
  return useSWR(null, fetcher, {
    revalidateIfStale: false,
    revalidateOnMount: false,
    revalidateOnFocus: false,
  });
};

export default useMySWR;
