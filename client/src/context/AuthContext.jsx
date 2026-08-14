import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  login as loginRequest,
  register as registerRequest,
  getCurrentUser,
} from "../api/auth.js";
import { setAuthToken } from "../api/axios.js";

const AuthContext = createContext(null);

const TOKEN_STORAGE_KEY = "taskoff_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY),
  );
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState(null);

  const isAuthenticated = useMemo(() => Boolean(user && token), [user, token]);

  const storeToken = useCallback((newToken) => {
    if (newToken) {
      localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
      setAuthToken(newToken);
      setToken(newToken);
    }
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setAuthToken(null);
    setToken(null);
    setUser(null);
  }, []);

  const handleAuthentication = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const currentUser = await getCurrentUser(token);
      setUser(currentUser);
    } catch (err) {
      clearSession();
      setError(err?.message || "Unable to restore session.");
    } finally {
      setLoading(false);
    }
  }, [token, clearSession]);

  useEffect(() => {
    setAuthToken(token);
    handleAuthentication();
  }, [handleAuthentication, token]);

  const login = useCallback(
    async ({ email, password }) => {
      setLoading(true);
      setError(null);

      try {
        const data = await loginRequest({ email, password });
        storeToken(data.token);
        setUser(data.user);
        return data.user;
      } catch (err) {
        setError(err?.message || "Login failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [storeToken],
  );

  const register = useCallback(
    async ({ fullName, email, password }) => {
      setLoading(true);
      setError(null);

      try {
        const data = await registerRequest({ fullName, email, password });
        storeToken(data.token);
        setUser(data.user);
        return data.user;
      } catch (err) {
        setError(err?.message || "Registration failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [storeToken],
  );

  const logout = useCallback(() => {
    clearSession();
    setError(null);
  }, [clearSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
