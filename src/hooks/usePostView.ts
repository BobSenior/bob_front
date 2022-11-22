import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default <T>(postIdx:number, userIdx:number) => {
    const { data, error } = useSWR<T>(
        `/post/${postIdx}?userIdx=${userIdx}`,fetcher
    );
    return { data, error };
};