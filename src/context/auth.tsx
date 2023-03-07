import { Account, Candidate, LoadMe, Recruiter } from "@/domain";
import { Nullable } from "@/lib/nullable";
import { logout } from "@/server-lib/api/auth";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { useMutation } from "react-query";

interface AuthContextModel {
  isAuth: boolean;
  whoAmi: Nullable<LoadMe.Model>;
  profile: () => Profile;
  swapProfile: () => void;
  canSwap: boolean;
  activeProfile: ProfileKey;
  logout?: () => void;
}

const AuthContext = React.createContext<AuthContextModel>(
  {} as AuthContextModel
);

export interface AuthProviderProps {
  account: Nullable<Account>;
  canSwap: boolean;
  isAuth: boolean;
  navigateAs: Nullable<ProfileKey>;
}

interface WithChildrenProps extends AuthProviderProps {
  children: React.ReactNode;  
}

type Profile = Candidate | Recruiter | undefined;
export type ProfileKey = "candidate" | "recruiter" | "unknown";

export const AuthProvider = ({
  children,
  canSwap,
  isAuth,
  account,
  navigateAs
}: WithChildrenProps) => {
  const router = useRouter();

  const profiles = useMemo(
    () =>
      new Map<ProfileKey, Profile>([
        ["candidate", account?.candidate],
        ["recruiter", account?.recruiter],
      ]),
    [account?.candidate, account?.recruiter]
  );

  const logoutMutate = useMutation(["@logout"], logout, {
    onSuccess: () => {
      router.push("/entrar");
    },
    onError: () => {
      profiles.clear();
    },
    retry: 0,
  });

  const profile = useCallback(() => {
    if (!canSwap) return profiles.get("candidate") || profiles.get("recruiter");

    if (!navigateAs) {
      logoutMutate.mutate()
      return;
    }

    if (profiles.get(navigateAs)) return profiles.get(navigateAs);
    logoutMutate.mutate();
  }, [navigateAs, canSwap, logoutMutate, profiles]);

  const swapProfile = useCallback(() => {
    if (canSwap) {      
      const active = navigateAs === "candidate" ? "recruiter" : "candidate"
      document.cookie = `navigateas=${active}; path=/`
      router.reload()
    }
  }, [canSwap, navigateAs, router]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        whoAmi: account,
        profile,
        swapProfile,
        canSwap,
        activeProfile: navigateAs!,
        logout: logoutMutate.mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
