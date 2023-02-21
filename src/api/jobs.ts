import { request } from "@/request";
import { LoadAllJob, LoadJob } from "@/domain";

export const getJobs = async (
  params?: LoadAllJob.Params
): Promise<LoadAllJob.Model> => {
  return (
    await request.get<{ data: LoadAllJob.Model }>(`/jobs`, {
      params: params && clearParamValueEmpty(params),
    })
  ).data.data;
};

export const getJob = async (jobId: String): Promise<LoadJob.Model> =>
  (await request.get(`/jobs/${jobId}`)).data;

const clearParamValueEmpty = (params: LoadAllJob.Params) => {
  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      delete params[key as keyof LoadAllJob.Params];
    }
  }
  return params;
};
