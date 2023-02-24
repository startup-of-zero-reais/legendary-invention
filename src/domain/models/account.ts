export type Account = {
  candidate?: Candidate;
  recruiter?: Recruiter;
};

type Candidate = {
  id: string;
  name: string;
  email: string;
  image: string;
};

type Recruiter = {
  id: string;
  name: string;
  email: string;
  image: string;
};
