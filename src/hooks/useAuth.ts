import { useContext } from "react";
import { authContext } from "../core/AuthProvider";

export const useAuth = () => {
  return useContext(authContext);
};
