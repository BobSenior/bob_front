import axios from "axios";
import {LoginResDTO} from "../types/db";
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "https://bobsenior.co.kr";

export const fetcher = (url: string) => {
  return axios(url)
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const datafetcher = (data:LoginResDTO) =>{
  return data;
}

export const postFetcher = axios.create({});
export const getFetcher = (url: string) =>
  axios
    .create({})
    .get(url)
    .then((res) => res.data.result);

export const postDetailsFetcher = (url: string) => {
  return axios(url).then((res) => res.data.result);
};

export const infiniteFetcher = (url: string) => {
  return axios(url).then((res) => {
    //TODO 배포 시 콘솔 삭제
    console.log(res.config.url);
    return res.data.result;
  });
};
