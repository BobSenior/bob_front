import { useParams } from "react-router-dom";
import useSWR, { SWRConfig, useSWRConfig } from "swr";

interface composeData {
  title: string | null;
  place: string | null;
  time: string | null;
  maxMember: number;
  contents: string | null;
  onlyForMyMajor: boolean;
  onlyForAnonymous: boolean;
}

const Compose = () => {
  const { id } = useParams();
  const { cache, mutate } = useSWRConfig();

  return <div></div>;
};
export default Compose;
