import { Account } from "@/domain";
import { Nullable } from "@/lib/nullable";
import { GetServerSidePropsContext } from "next";
import { request } from "@/server-lib/services";
import { AuthProviderProps, ProfileKey } from "@/context/auth";

export class Auth {
  async getSession() {
    const response = await request.get<Account>(`/auth/me`)
      .catch(() => ({ data: null }));
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

  activeProfile(context: GetServerSidePropsContext): Nullable<ProfileKey> {
    const activeProfile = context.req.cookies['navigateas'];

    if (!activeProfile) return null

    return activeProfile as ProfileKey
  }

  async authProps(context: GetServerSidePropsContext): Promise<AuthProviderProps> {
    request.defaults.headers.common.Authorization = this
        .getAuthToken(context)
        .toBearer();

    const account = await this.getSession();
    
    return {
      account,
      canSwap: this.canSwap(account),
      isAuth: this.isAuth(account),
      navigateAs: this.activeProfile(context)
    }
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