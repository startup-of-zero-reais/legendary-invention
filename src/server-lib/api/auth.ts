import { Authentication, LoadMe, RegisterCandidate } from "@/domain";
import { RegisterRecruiter } from "@/domain/usecases/register-recruiter";
import { request } from "@/server-lib/services";

export const auth = async (auth?: Authentication.Params) => {
  return await request.post(`/auth/login`, {
    email: auth?.email,
    password: auth?.password,
  });
};

function bearer(token: string): string {
  return `Bearer ${token.replace(/^bearer\s/i, "")}`;
}

export const me = async (sessionToken?: string): Promise<LoadMe.Model> => {
  const requestConfig = {};

  if (sessionToken) {
    Object.assign(requestConfig, {
      headers: { Authorization: bearer(sessionToken) },
    });
  }

  function handleError(err: Error) {
    console.log(`fail getting me reason: ${err.message}`);
    return { data: { candidate: undefined, recruiter: undefined } };
  }

  const meResult = await request
    .get<LoadMe.Model>(`/auth/me`, requestConfig)
    .catch(handleError);

  return meResult.data;
};

export const logout = async (): Promise<void> => {
  await request.post<void>(`/auth/logout`);
};

export const registerCandidate = async (params: RegisterCandidate.Params) => {
  return (await request.post<RegisterCandidate.Model>(`/candidates`, params))
    .data;
};

export const registerRecruiter = async (params: RegisterRecruiter.Params) => {
  return (await request.post<RegisterRecruiter.Model>(`/recruiters`, params))
    .data;
};
