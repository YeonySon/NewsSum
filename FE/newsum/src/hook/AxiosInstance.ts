import axios from "axios";

export const BaseInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    // 'Authorization': cookie.load('accessToken') || '',
    'Content-Type' : 'application/json',
  },
});