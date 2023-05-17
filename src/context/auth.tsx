import { Account, LoadMe } from "@/domain";
import { Nullable } from "@/lib/nullable";
import { signOut, useSession } from "next-auth/react";
import React, { useContext } from "react";

interface AuthContextModel {
  isAuth: boolean;
  whoAmi: Nullable<LoadMe.Model>;
  logout?: () => void;
}

const AuthContext = React.createContext<AuthContextModel>(
  {} as AuthContextModel
);

export interface AuthProviderProps {
  account: Nullable<Account>;
  canSwap: boolean;
  isAuth: boolean;
}

interface WithChildrenProps extends AuthProviderProps {
  children: React.ReactNode;  
}

export const AuthProvider = ({
  children,
  canSwap,
  isAuth,
  account,
}: WithChildrenProps) => {
  const { status, data } = useSession()

  if (status === "authenticated" && data?.user) {
    account = {
        email: data.user.email!,
        image: data.user.image!,
        name: data.user.name!,
        id: performance.now().toString(),
    }    
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        whoAmi: account,
        logout: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
