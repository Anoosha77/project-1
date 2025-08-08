import { useMutation } from "@tanstack/react-query";
import { login, verifyLoginOtp, resendOtp } from "@/@core/api/api";
import { useUserStore } from "@/store/userStore";

export const useLogin = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      // ✅ Extract actual data from axios response
      const { accessToken, user } = response.data;
      setUser(user, accessToken);
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      verifyLoginOtp(email, otp),
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: (email: string) => resendOtp(email),
  });
};
