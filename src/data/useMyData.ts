import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { IUser } from "../types/db";

const useMyData = () => {
  const { data, error, isValidating, mutate } = useSWR<IUser | false>(
    "/api/users",
    fetcher,
    {
      dedupingInterval: 2000,
    }
  );

  return {
    data,
    error,
    mutate,
    isValidating,
  };
};

export default useMyData;
