import { useMutation } from "@tanstack/react-query";
import { login, verifyLoginOtp, resendOtp } from "@/@core/api/api";
import { useUserStore } from "@/store/userStore";
import { forgotPassword, verifyResetOtp, resetPassword, changePassword } from "@/@core/api/auth";

export const useLogin = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { accessToken, user } = response.data;
      // ✅ Store in Zustand (persist middleware will handle localStorage under "user-storage")
      setUser(user, accessToken);
    },
  });
};

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      verifyLoginOtp(email, otp),
  });

export const useResendOtp = () =>
  useMutation({
    mutationFn: (email: string) => resendOtp(email),
  });

export const useForgotPassword = () =>
  useMutation({ mutationFn: forgotPassword });
export const useVerifyResetOtp = () =>
  useMutation({ mutationFn: verifyResetOtp });
export const useResetPassword = () =>
  useMutation({ mutationFn: resetPassword });
export const useChangePassword = () =>
  useMutation({ mutationFn: changePassword });
