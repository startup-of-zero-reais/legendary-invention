import { ApplyVacancy } from "@/domain";
import { request } from "../services";

export const apply = async (
  param: ApplyVacancy.Params,
  sessionToken?: string
) => {
  return await request.post(
    "/apply",
    { jobID: param.jobId },
    { headers: { Authorization: "Bearer " + sessionToken } }
  );
};
