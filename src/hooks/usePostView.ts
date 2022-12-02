import useSWR from "swr";
import { getFetcher } from "../utils/fetchers";

export default <T>(postIdx: number, userIdx: number) => {
  const { data, error } = useSWR<T>(
    `/post/${postIdx}?userIdx=${userIdx}`,
    getFetcher
  );
  return { data, error };
};
