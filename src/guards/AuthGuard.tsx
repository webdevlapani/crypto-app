import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthGuard: FC = () => {
  const auth = useAuth();

  return auth.user.name ? <Outlet /> : <Navigate to="/" />;
};

export default AuthGuard;
