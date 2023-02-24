import { LoadMe, useLoadMe } from "@/domain";
import React, { useContext } from "react";

interface AuthProviderProps {
  me?: LoadMe.Model;
}

const AuthContext = React.createContext<AuthProviderProps>(
  {} as AuthProviderProps
);

interface WithChildrenProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: WithChildrenProps) => {
  const { data } = useLoadMe();

  return (
    <AuthContext.Provider
      value={{
        me: data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
