import { Account, LoadMe } from "@/domain";
import { Authentication } from "@/domain/usecases/authentication";
import { Nullable } from "@/lib/nullable";
import { request } from "@/server-lib/services";
import { AxiosError, HttpStatusCode } from "axios";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { serialize } from "cookie";

export const auth = async (auth?: Authentication.Params) => {
  return await request.post(`/auth/login`, {
    email: auth?.email,
    password: auth?.password,
  });
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

// Email
// Password
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method && req.method.toUpperCase() === "POST") {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(HttpStatusCode.BadRequest)
          .json({ message: "Faltando credenciais" });
      }

      const response = await auth({ email, password });

      res.setHeader(
        "Set-Cookie",
        serialize("session", response.headers["session"], { path: "/" })
      );

      return res.status(200).send(req.headers.origin);
    } catch (error) {
      const errorMessage: Record<number, string> = {
        400: "Email ou senha incorreto.",
        401: "Não autorizado.",
        403: "Acesso negado.",
        0: "Ocorreu um problema tente novamente mais tarde",
      };
      if (error instanceof AxiosError) {
        return res
          .status(error.response?.status || HttpStatusCode.InternalServerError)
          .json({ message: errorMessage[error.response?.status || 0] });
      }
      return res
        .status(HttpStatusCode.InternalServerError)
        .send({ message: errorMessage[0] });
    }
  }
}
