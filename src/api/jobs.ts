import { request } from "@/request";
import { LoadAllJob, LoadJob } from "@/domain";
import { buildQueryString } from "@/utils/build-query-string";

export const getJobs = async (
  params?: LoadAllJob.Params
): Promise<LoadAllJob.Model> => {
  return (
    await request.get<{ data: LoadAllJob.Model }>(`/jobs`, {
      params: buildQueryString<LoadAllJob.Params>(params),
    })
  ).data.data;
};

export const getJob = async (jobId: String): Promise<LoadJob.Model> =>
  (await request.get(`/jobs/${jobId}`)).data;
