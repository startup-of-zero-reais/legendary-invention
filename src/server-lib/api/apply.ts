import { ApplyVacancy, LoadAppliedJobs } from "@/domain";
import { AxiosError } from "axios";
import { request } from "../services";

export const apply = async (
  param: ApplyVacancy.Params,
  sessionToken?: string
): Promise<boolean> => {
  return (
    (
      await request.post(
        "/apply",
        { jobID: param.jobId },
        {
          headers: {
            Authorization: "Bearer " + sessionToken,
            "Content-Type": "application/json",
          },
        }
      )
    ).status === 201
  );
};

export const getAppliedJobs = async (): Promise<LoadAppliedJobs.Result> => {
  const appliedJobs = await request.get("/apply").catch(handleErr);
  return appliedJobs.data;
};

function handleErr(err: AxiosError<any>): { data: LoadAppliedJobs.Result } {
  let errMsg = `unknown error with ${err.stack} code`;

  if ("error" in err.response?.data) {
    errMsg = err.response?.data.error;
  }

  console.log(`fail getting my applies, reason: ${errMsg}`);

  return {
    data: {
      data: [],
      meta: { total: 0 },
    },
  };
}
