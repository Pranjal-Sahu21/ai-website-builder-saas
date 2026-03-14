import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const login = false; 

  if (!login) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return <>{children}</>;
}
