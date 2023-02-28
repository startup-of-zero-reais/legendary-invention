export type Account = {
  candidate?: Candidate;
  recruiter?: Recruiter;
};

export type Candidate = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export type Recruiter = {
  id: string;
  name: string;
  email: string;
  image: string;
  companyID: string;
  companyCNPJ: string;
  companyStatus: string;
};
