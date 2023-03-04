export namespace RegisterRecruiter {
  export type Params = {
    name: string;
    email: string;
    password: string;
    phone: string;
    company: {
      cnpj: string;
      logo?: string;
      description?: string;
    };
  };
  export type Model = {
    name: string;
    email: string;
    password: string;
    phone: string;
    company: {
      cnpj: string;
      logo: string;
      description: string;
    };
  };
}
