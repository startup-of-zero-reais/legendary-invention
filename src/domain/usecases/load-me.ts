import { me } from "@/api/auth";
import { useQuery } from "react-query";
import { Account } from "../models/account";

export namespace LoadMe {
  export type Model = Account;
}

export const useLoadMe = () =>
  useQuery(["@loadme"], async () => await me(), { retry: 0 });
