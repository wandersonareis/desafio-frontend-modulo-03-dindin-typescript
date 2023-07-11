import { FunctionComponent } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import { ProtectedRouteProps } from "../type";

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;