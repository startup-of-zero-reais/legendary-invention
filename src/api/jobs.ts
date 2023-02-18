import { request } from "@/request";
import { LoadAllJob, LoadJob } from "@/domain";

export const getJobs = async (
  params: LoadAllJob.Params
): Promise<LoadAllJob.Model> =>
  (
    await request.get<{ data: LoadAllJob.Model }>(`/jobs`, {
      params: params,
    })
  ).data.data;

export const getJob = async (jobId: String): Promise<LoadJob.Model> =>
  (await request.get(`/jobs/${jobId}`)).data;
