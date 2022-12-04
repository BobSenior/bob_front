import axios from "axios";
axios.defaults.withCredentials = true;

export const fetcher = (url: string) => {
  return axios(url)
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const postFetcher = axios.create({});
export const getFetcher = axios.create({});

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
