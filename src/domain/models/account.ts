export type Account = {
  id: string;
  name: string;
  email: string;
  image: string;
  
  company?: Company;
};

export type Company = {
  companyID: string;
  companyCNPJ: string;
  companyStatus: string;
};
