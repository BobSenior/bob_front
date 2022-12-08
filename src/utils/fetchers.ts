import axios from "axios";
import { LoginResDTO } from "../types/db";
axios.defaults.withCredentials = true;

const API = "/api";

export const fetcher = (url: string) => {
  return axios(API + url)
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const normalPostFetcher = axios.create({});
export const postFetcher = axios.create({});
export const getFetcher = (url: string) =>
  axios
    .create({})
    .get(API + url)
    .then((res) => res.data.result);

export const postDetailsFetcher = (url: string) => {
  return axios(API + url, {}).then((res) => res.data.result);
};

export const infiniteFetcher = (url: string) => {
  return axios(API + url, {}).then((res) => {
    return res.data.result;
  });
};
