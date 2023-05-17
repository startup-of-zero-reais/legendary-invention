import { LoadMe } from "@/domain";
import { Nullable } from "@/lib/nullable";
import { signOut, useSession } from "next-auth/react";
import React, { useContext } from "react";

interface AuthContextModel {
  whoAmi: Nullable<LoadMe.Model>;
  logout?: () => void;
}

const AuthContext = React.createContext<AuthContextModel>(
  {} as AuthContextModel
);


interface WithChildrenProps {
  children: React.ReactNode;  
}

export const AuthProvider = ({
  children,
}: WithChildrenProps) => {
  const { status, data } = useSession()

  let account: Nullable<any>;

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
