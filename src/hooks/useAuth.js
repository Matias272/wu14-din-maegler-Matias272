import { useContext } from "react";
import { AuthContext } from "../context/authContextObject";

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return authContext;
}
