import { auth } from "@/api/auth";
import { AxiosError, HttpStatusCode } from "axios";
import { useMutation, useQuery } from "react-query";
import { HttpError } from "./types";

export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
  };
}

export type Result = {
  onSuccess?: (data: unknown) => void;
  throwErrorView?: (error: HttpError) => void;
};
export const useAuthentication = (result: Result) =>
  useMutation<void, Error, Authentication.Params>(
    async (params) => {
      try {
        await auth(params);
      } catch (error) {
        const err = error as AxiosError;
        switch (err.response?.status) {
          case HttpStatusCode.Unauthorized:
            throw new Error("Nome de usuário ou senha inválida.");
          default:
            throw new Error("Serviço indisponível");
        }
      }
    },
    {
      onSuccess: result.onSuccess,
    }
  );
