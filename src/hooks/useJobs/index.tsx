import { getJobs } from "@/api/jobs";
import { useQuery } from "react-query";

export type Filter = {
  search?: string;
  page?: number;
};

export const useGetJobs = (filter: Filter = {}) => {
  return useQuery(["jobs-get", filter], getJobs, { retry: 0 });
};
