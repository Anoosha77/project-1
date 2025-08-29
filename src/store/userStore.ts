import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  createdAt: string;
};

type UserState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User, token: string) => void;
  clearTempAuth: () => void;
  logout: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setUser: (user, token) => {
        set({
          user,
          accessToken: token,
          isAuthenticated: user.verified,
        });
      },
      clearTempAuth: () => {
        localStorage.removeItem("otp_email");
        localStorage.removeItem("temp_token");
      },
      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
        localStorage.removeItem("user-storage"); // Zustand persist
        localStorage.removeItem("otp_email");
        localStorage.removeItem("temp_token");
      },
    }),
    { name: "user-storage" }
  )
);
