import { request } from "@/server-lib/services";
import { LoadAllJob, LoadJob } from "@/domain";
import { buildQueryString } from "@/lib/build-query-string";
import { Nullable } from "@/lib/nullable";

export const getJobs = async (
  params?: LoadAllJob.Params
): Promise<LoadAllJob.Model> => {
  return (
    await request.get<{ data: LoadAllJob.Model }>(`/jobs`, {
      params: buildQueryString<LoadAllJob.Params>(params),
    })
  ).data.data;
};

export const getJob = async (jobId?: string): Promise<Nullable<LoadJob.Model>> => {
  if (!jobId)
    return null;

  return (await request.get(`/jobs/${jobId}`)).data;
}
