import { ApplyVacancy } from "@/domain";
import { request } from "../services";

export const apply = async (param: ApplyVacancy.Params): Promise<void> => {
  return await request.post("/apply", param);
};
