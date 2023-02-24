import { LoadMe } from "@/domain";
import { Authentication } from "@/domain/usecases/authentication";
import { request } from "@/request";

export const auth = async (auth?: Authentication.Params): Promise<void> => {
  await request.post(`/auth/login`, {
    email: auth?.email,
    password: auth?.password,
  });
};

export const me = async (): Promise<LoadMe.Model> => {
  return (await request.get<LoadMe.Model>(`/auth/me`)).data;
};
