import { getJobs } from "@/api/jobs";
import { useQuery } from "react-query";
import { JobModel } from "../models/job-model";
import { Links } from "../models/link";

export namespace LoadAllJob {
  export type Model = JobModel[] & Links;
  export type Params = {
    search?: string;
    page?: number;
  };
}

export const useLoadAllJob = (params: LoadAllJob.Params) =>
  useQuery(["@loadAlljobs", params], async () => await getJobs(params), {
    retry: 0,
  });
