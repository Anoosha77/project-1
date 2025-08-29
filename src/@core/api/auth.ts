import { axiosInstanceAuth } from "../instances/instances";

export const login = (data: { email: string; password: string }) => {
  return axiosInstanceAuth.post("login", data);
};

export const forgotPassword = (data: { email: string }) => {
  return axiosInstanceAuth.post("forgot-password", data);
};

export const verifyResetOtp = (data: { email: string; otp: string }) => {
  return axiosInstanceAuth.post("verify-reset-otp", data);
};

export const resetPassword = (data: { email: string; newPassword: string }) => {
  return axiosInstanceAuth.post("reset-password", data);
};

export const changePassword = (data: { oldPassword: string; newPassword: string }) => {
  return axiosInstanceAuth.post("change-password", data);
};


export const googleLogin = async (token: string) => {
  try {
    const response = await axiosInstanceAuth.post("google", {
      token, 
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};