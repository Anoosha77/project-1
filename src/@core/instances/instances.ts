import axios from "axios";
import { serverUrl } from "../config/config";
import { useUserStore } from "@/store/userStore";

const baseUrlAuth: string = `${serverUrl}/api/v1/auth`;
const baseUrlAdmin: string = `${serverUrl}/api/v1/admin`;
const baseUrlUser: string = `${serverUrl}/api/v1/users`;

export const axiosInstanceAuth = axios.create({ baseURL: baseUrlAuth });
export const axiosInstanceAdmin = axios.create({ baseURL: baseUrlAdmin });
export const axiosInstanceUser = axios.create({ baseURL: baseUrlUser });


axiosInstanceAuth.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstanceAdmin.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstanceUser.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
