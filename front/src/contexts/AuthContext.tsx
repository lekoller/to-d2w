import { useState, createContext } from "react";

export const AuthContext: React.Context<string> = createContext<string>("");

export const UpdateAuthContext: React.Context<(state: string) => void> =
  createContext<(state: string) => void>(() => {});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<string>("");

  const updateAuth = (state: string) => {
    setAuth(state);
    localStorage.setItem("token", state);
  };

  return (
    <AuthContext.Provider value={auth}>
      <UpdateAuthContext.Provider value={updateAuth}>
        {children}
      </UpdateAuthContext.Provider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;