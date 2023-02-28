import { JobModel } from "../models/job-model";

export namespace LoadJob {
  export type Model = JobModel;
  export type Params = {
    id: string;
  };
}
