import { getJob } from "@/api/jobs";
import { useQuery } from "react-query";
import { JobModel } from "../models/job-model";

export namespace LoadJob {
  export type Model = JobModel;
  export type Params = {
    id: string;
  };
}

export const useLoadJob = (param: LoadJob.Params) =>
  useQuery(["@loadjob", param.id], async () => await getJob(param.id), {
    enabled: !!param.id,
    retry: 0,
  });
