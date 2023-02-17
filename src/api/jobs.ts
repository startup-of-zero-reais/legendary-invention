import { QueryFunction, QueryKey } from "react-query";
import { request } from "@/request";
import { Links } from "./abstract";
import { Filter } from "@/hooks/useJobs";

type Company = {
  id: string;
  cnpj: string;
  logo: string;
  description: string;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  salary: string;
  company: Company;
  createdAt: string;
  updatedAt: string;
  techs: string[];
  location: string;
  workModel: string;
} & Links;

export const getJobs: QueryFunction<Job[], ["jobs-get", Filter]> = async (
  params
): Promise<Job[]> => {
  const [_, filters] = params.queryKey;

  try {
    const response = await request.get<{ data: Job[] }>(`/jobs`, {
      params: filters,
    });
    return response.data.data;
  } catch (e) {
    return [];
  }
};
