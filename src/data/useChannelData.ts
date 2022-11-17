import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { IChannel } from "../types/db";
import useMyData from "../data/useMyData";

const useChannelData = (workspaceName?: string, channelName?: string) => {
  const { data, error, mutate, isValidating } = useSWR<IChannel>(
    useMyData().data
      ? `/api/workspaces/${workspaceName}/channels/${channelName}`
      : null,
    fetcher,
    {}
  );

  return {
    data,
    error,
    mutate,
    isValidating,
  };
};

export default useChannelData;
