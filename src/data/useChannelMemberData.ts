import useSWR from "swr";
import { IUser } from "../types/db";
import fetcher from "../utils/fetcher";
import useMyData from "../data/useMyData";

const useChannelMemberData = (workspaceName?: string, channelName?: string) => {
  const { data, error, isValidating, mutate } = useSWR<IUser[]>(
    useMyData().data && channelName
      ? `/api/workspaces/${workspaceName}/channels/${channelName}/members`
      : null,
    fetcher
  );

  return {
    data,
    mutate,
    error,
    isValidating,
  };
};

export default useChannelMemberData;
