import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  // If not logged in, send to login, but keep where they came from
  if (!isAuthenticated || !user) {
    if (location.pathname !== "/login") {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
