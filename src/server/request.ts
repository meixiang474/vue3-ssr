import { HOST } from "@/api";
import axios, { AxiosInstance } from "axios";
import { Request } from "express";

const createServerRequest = (req: Request): AxiosInstance => {
  const instance = axios.create({
    baseURL: HOST,
    headers: {
      post: {
        "Content-Type": "application/json; charset=utf-8",
      },
      cookie: req.get("cookie") || "",
    },
  });
  instance.interceptors.response.use(
    (res) => {
      if ((res.status >= 200 && res.status < 300) || res.status === 304) {
        const { data } = res;
        if (data.status === 200) {
          return data.data;
        } else {
          return Promise.reject(data);
        }
      } else {
        return Promise.reject(res);
      }
    },
    (err) => Promise.reject(err)
  );
  return instance;
};

export default createServerRequest;
