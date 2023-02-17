export type JobModel = {
  id: string;
  title: string;
  description: string;
  salary: string;
  company?: Company;
  createdAt: string;
  updatedAt: string;
  techs?: string[];
  workModel: string;
};

export type Company = {
  id: string;
  cnpj: string;
  logo: string;
  description: string;
  location: string;
};
