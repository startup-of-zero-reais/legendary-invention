import { AxiosError, HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { auth } from "@/server-lib/api/auth";

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
        400: "Credenciais inválidas.",
        401: "Credenciais inválidas.",
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
