import React, { createContext, useReducer, useEffect } from "react";
import TokenManager from "../APIs/TokenManager";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useReducer((oldState, newState) => newState, {
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    const handelTokenRefreshed = () => {
      updateAuth();
    };
    window.addEventListener("tokenRefreshed", handelTokenRefreshed);

    return () => {
      window.removeEventListener("tokenRefreshed", handelTokenRefreshed);
    };
  }, []);

  const updateAuth = async () => {
    const token = TokenManager.getAccessToken();
    const user = TokenManager.getClaims();
    if (token && user && TokenManager.isTokenValid()) {
      setState({
        isAuthenticated: true,
        user,
        token,
      });
    } else {
      setState({
        isAuthenticated: false,
        user: null,
        token: null,
      });
    }
  };

  useEffect(() => {
    updateAuth();
  }, []);

  const logout = async () => {
    TokenManager.clear();
    await updateAuth();
  };

  // Define the value that will be provided to components that consume this context
  const authContextValue = {
    ...state,
    updateAuth,
    logout,
  };

  // Provide this value to all components within the AuthProvider
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
