import axios from "axios";

const token = '';
export const BaseInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    Authorization: token,
  },
});