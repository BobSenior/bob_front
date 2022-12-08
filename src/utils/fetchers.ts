import axios from "axios";
import { LoginResDTO } from "../types/db";
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "https://bobsenior.co.kr";

export const fetcher = (url: string) => {
  return axios(url)
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const normalPostFetcher = axios.create({});
export const postFetcher = axios.create({
  headers: { jwtAccessToken: sessionStorage.getItem("jwtAccessToken") },
});
export const getFetcher = (url: string) =>
  axios
    .create({
      headers: { jwtAccessToken: sessionStorage.getItem("jwtAccessToken") },
    })
    .get(url)
    .then((res) => res.data.result);

export const postDetailsFetcher = (url: string) => {
  return axios(url, {
    headers: { jwtAccessToken: sessionStorage.getItem("jwtAccessToken") },
  }).then((res) => res.data.result);
};

export const infiniteFetcher = (url: string) => {
  return axios(url, {
    headers: { jwtAccessToken: sessionStorage.getItem("jwtAccessToken") },
  }).then((res) => {
    return res.data.result;
  });
};
