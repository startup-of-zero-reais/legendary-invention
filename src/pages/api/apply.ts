import { apply } from "@/server-lib/api/apply";
import { AxiosError, HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method && req.method.toUpperCase() === "POST") {
    const { jobId } = req.body;

    try {
      const response = await apply(jobId);

      return res.status(200).send(response);
    } catch (error) {
      const errorMessage: Record<number, string> = {
        400: "Você já aplicou para essa vaga.",
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
