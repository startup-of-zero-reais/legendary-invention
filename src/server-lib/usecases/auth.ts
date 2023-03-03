import { Account } from "@/domain";
import { Nullable } from "@/lib/nullable";
import { GetServerSidePropsContext } from "next";
import { request } from "@/server-lib/services";

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
