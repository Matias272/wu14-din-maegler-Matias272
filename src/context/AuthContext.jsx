import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getCurrentUserRequest,
  loginRequest,
  registerRequest,
} from "../api/auth";
import { AuthContext } from "./authContextObject";

const AUTH_STORAGE_KEY = "dinmaegler_auth";

function readStoredAuth() {
  try {
    const rawAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawAuth) {
      return { token: "", user: null };
    }

    const parsedAuth = JSON.parse(rawAuth);
    return {
      token: parsedAuth?.token || "",
      user: parsedAuth?.user || null,
    };
  } catch {
    return { token: "", user: null };
  }
}

export function AuthProvider({ children }) {
  const [{ token, user }, setAuthState] = useState(readStoredAuth);
  const [isAuthLoading, setIsAuthLoading] = useState(Boolean(token) && !user);

  const persistAuth = useCallback((nextToken, nextUser) => {
    if (!nextToken) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setAuthState({ token: "", user: null });
      return;
    }

    const authPayload = { token: nextToken, user: nextUser };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authPayload));
    setAuthState(authPayload);
  }, []);

  const logout = useCallback(() => {
    persistAuth("", null);
  }, [persistAuth]);

  const login = useCallback(async ({ identifier, password }) => {
    const data = await loginRequest(identifier, password);
    persistAuth(data.jwt, data.user);
    return data.user;
  }, [persistAuth]);

  const register = useCallback(async ({ username, email, password }) => {
    const data = await registerRequest({ username, email, password });

    if (data.jwt && data.user) {
      persistAuth(data.jwt, data.user);
      return data.user;
    }

    const loginData = await loginRequest(email, password);
    persistAuth(loginData.jwt, loginData.user);
    return loginData.user;
  }, [persistAuth]);

  useEffect(() => {
    if (!token || user) {
      setIsAuthLoading(false);
      return;
    }

    let isMounted = true;

    const loadCurrentUser = async () => {
      try {
        const fetchedUser = await getCurrentUserRequest(token);
        if (isMounted) {
          persistAuth(token, fetchedUser);
        }
      } catch {
        if (isMounted) {
          logout();
        }
      } finally {
        if (isMounted) {
          setIsAuthLoading(false);
        }
      }
    };

    loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, [logout, token, user, persistAuth]);

  const contextValue = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      isAuthLoading,
      login,
      register,
      logout,
    }),
    [token, user, isAuthLoading, login, logout, register]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
