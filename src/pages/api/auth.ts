import { Account, LoadMe } from "@/domain";
import { Authentication } from "@/domain/usecases/authentication";
import { Nullable } from "@/lib/nullable";
import { request } from "@/server-lib/services";
import { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";

export const auth = async (auth?: Authentication.Params): Promise<void> => {
  try {
    await request.post(`/auth/login`, {
      email: auth?.email,
      password: auth?.password,
    });
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 401) {
      throw new Error("Email ou senha incorreto.");
    }

    throw new Error("Erro desconhecido volte mais tarde.");
  }
};

export const me = async (): Promise<LoadMe.Model> => {
  return (
    await request.get<LoadMe.Model>(`/auth/me`, {
      headers: { Authorization: "any" },
    })
  ).data;
};

export const logout = async (): Promise<void> => {
  await request.post<void>(`/auth/logout`);
};

export class Auth {
  async getSessionFromContext(context: GetServerSidePropsContext) {
    const session = context.req.cookies[process.env.SESSION_KEY!];
    const response = await request.get<Account>(`/auth/me`, {
      headers: { Authorization: "Bearer " + session },
    });
    return response.data;
  }

  canSwap(account: Nullable<Account>): boolean {
    if (!account) return false;
    return Boolean(account.candidate && account.recruiter);
  }

  isAuth(account: Nullable<Account>): boolean {
    if (!account) return false;
    return Boolean(account.candidate || account.recruiter);
  }
}

export const makeAuth = (): Auth => new Auth();
