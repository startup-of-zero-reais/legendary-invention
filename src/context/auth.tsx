import { Account, Candidate, LoadMe, Recruiter } from "@/domain";
import { Nullable } from "@/lib/nullable";
import { logout } from "@/pages/api/auth";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface AuthProviderProps {
  whoAmi: Nullable<LoadMe.Model>;
  profile: () => Profile;
  swapProfile: () => void;
  canSwap: boolean;
  activeProfile: ProfileKey;
  logout?: () => void;
}

const AuthContext = React.createContext<AuthProviderProps>(
  {} as AuthProviderProps
);

interface WithChildrenProps {
  children: React.ReactNode;
  account: Nullable<Account>;
  canSwap: boolean;
  isAuth: boolean;
}

type Profile = Candidate | Recruiter | undefined;
type ProfileKey = "candidate" | "recruiter" | "unknown";

export const AuthProvider = ({
  children,
  canSwap,
  isAuth,
  account,
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

  const [activeProfile, setActiveProfile] = useState<ProfileKey>(() =>
    profiles.get("candidate")
      ? "candidate"
      : profiles.get("recruiter")
      ? "recruiter"
      : "unknown"
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
    if (profiles.get(activeProfile)) return profiles.get(activeProfile);
    logoutMutate.mutate();
  }, [activeProfile, canSwap, logoutMutate, profiles]);

  const swapProfile = useCallback(() => {
    if (canSwap) {
      setActiveProfile((old) =>
        old === "candidate" ? "recruiter" : "candidate"
      );
    }
  }, [canSwap]);

  return (
    <AuthContext.Provider
      value={{
        whoAmi: account,
        profile,
        swapProfile,
        canSwap,
        activeProfile,
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
