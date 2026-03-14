import { authClient } from "@/lib/auth-client";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session } = authClient.useSession();

  if (!session) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return <>{children}</>;
}
