import { auth } from "@/auth";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const session = await auth();
    const token = session?.user?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
