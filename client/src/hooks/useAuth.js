import { createContext } from "react";
import AuthContext from "../context/AuthContext";

export default function useAuth() {
  const context = createContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider.");

  return context;
}
