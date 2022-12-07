import useSWR from "swr";
import {datafetcher, fetcher} from "../utils/fetchers";
import {LoginResDTO} from "../types/db";

const useMySWR = () => {
  return useSWR<LoginResDTO>(null, datafetcher, {
    revalidateIfStale: false,
    revalidateOnMount: false,
    revalidateOnFocus: false,
  });
};

export default useMySWR;
