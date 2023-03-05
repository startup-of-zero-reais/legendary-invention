import { Account } from "@/domain";
import { Nullable } from "@/lib/nullable";
import { GetServerSidePropsContext } from "next";
import { request } from "@/server-lib/services";

export class Auth {
  async getSession() {
    const response = await request.get<Account>(`/auth/me`);
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

  getAuthToken(context: GetServerSidePropsContext) {
    if (!process.env.SESSION_KEY) {
      console.error(`missing environment SESSION_KEY.`)
    }

    const session = context.req.cookies[process.env.SESSION_KEY!];

    return new Token(session);
  }
}

class Token {
  constructor(private readonly token?: string) {}

  toString() {
    return this.token;
  }

  toBearer() {
    if (!this.token) {
      console.error('can not parse toBearer empty token')
      return ''
    };

    return `Bearer ${this.toString()}`
  }

  toAuthorization() {
    if (!this.token) {
      console.error('can not parse toAuthorization empty token')
      return {}
    };

    return { Authorization: this.toBearer() }
  }
}