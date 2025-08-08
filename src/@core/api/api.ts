import { axiosInstanceAuth } from "../instances/instances";
// import { axiosInstanceAdmin } from "../instances/instances";
// import { axiosInstanceUser } from "../instances/instances";


interface LoginData { 
  email: string;
  password?: string;
  otp?: number
}

export const login = (data: LoginData) => {
  return axiosInstanceAuth.post("login", data);
};


export const verifyLoginOtp = async (email: string, otp: string) => {
  return axiosInstanceAuth.post("verify-login-otp", { email, otp });
};

export const resendOtp = async (email: string) => {
  return axiosInstanceAuth.post("resend-otp", { email });
};
