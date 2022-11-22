import axios from "axios";

export const getFetcher = axios.create({
  baseURL: "http://localhost:8080",
  method: "get",
  withCredentials: true,
  httpsAgent: {},
});

export const postFetcher = axios.create({});
