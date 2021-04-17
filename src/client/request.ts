import axios from "axios";

const clientRequest = axios.create({
  baseURL: "/",
  headers: {
    post: {
      "Content-Type": "application/json; charset=utf-8",
    },
  },
});

export default clientRequest;
