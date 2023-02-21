import { request } from "@/request";
import { LoadAllJob, LoadJob } from "@/domain";

export const getJobs = async (
  params?: LoadAllJob.Params
): Promise<LoadAllJob.Model> => {
  return (
    await request.get<{ data: LoadAllJob.Model }>(`/jobs`, {
      params: clearParamValueEmpty(params),
    })
  ).data.data;
};

export const getJob = async (jobId: String): Promise<LoadJob.Model> =>
  (await request.get(`/jobs/${jobId}`)).data;

const clearParamValueEmpty = (params?: LoadAllJob.Params) => {
  const urlParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params || {})) {
    if (typeof value !== "undefined") urlParams.set(key, value as string);
  }

  return params;
};
