import { registerCandidate, registerRecruiter } from "@/server-lib/api/auth";
import { AxiosError, HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method && req.method.toUpperCase() === "POST") {
    try {
      const { email, name, password, phone, cnpj, description, logo } =
        req.body;

      const response = await registerRecruiter({
        email,
        password,
        name,
        phone,
        company: {
          cnpj,
          description,
          logo,
        },
      });

      return res.status(200).send(response);
    } catch (error) {
      const errorMessage: Record<number, string> = {
        400: "Preencha os dados corretamente.",
        409: "Recrutador já existe.",
        404: "Empresa não encontrada",
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
