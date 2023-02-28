import { JobModel } from "../models/job-model";
import { Links } from "../models/link";

export namespace LoadAllJob {
  export type Model = JobModel[] & Links;
  export type Params = {
    search?: string;
    page?: number;
    minSalary?: number;
    maxSalary?: number;
    contracts?: string;
    availability?: string;
  };
}
