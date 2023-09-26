import axios from "axios";

const token = '';
export const BaseInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: token,
  },
});