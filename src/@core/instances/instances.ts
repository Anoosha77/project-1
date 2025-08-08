

import axios from "axios";
import { serverUrl } from "../config/config";


const baseUrlAuth:string = `${serverUrl}/api/v1/auth/`;
const baseUrlAdmin:string =`${serverUrl}/api/v1/admin/`;
const baseUrlUser:string =`${serverUrl}/api/v1/users/`;


export const axiosInstanceAuth = axios.create({
  baseURL:baseUrlAuth,
});

                                                      
export const axiosInstanceAdmin =axios.create({
  baseURL:baseUrlAdmin,
});


export const axiosInstanceUser =axios.create({
  baseURL:baseUrlUser,
})
