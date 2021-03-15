import React, { createContext, useMemo, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const token = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
  window.location.hash = "";

  const value = useMemo(
    () => ({
      token,
    }),
    [token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be in scope when using "useAuth"');
  }

  return authContext;
}
