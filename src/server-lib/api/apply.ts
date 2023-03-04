import { request } from "../services";

export const apply = async (): Promise<void> => {
  return await request.post("/apply");
};
