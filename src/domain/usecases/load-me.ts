import { me } from "@/pages/api/auth";
import { useQuery } from "react-query";
import { Account } from "../models/account";

export namespace LoadMe {
  export type Model = Account;
}
