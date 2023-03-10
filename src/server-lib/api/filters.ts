import { LoadFilters } from "@/domain/usecases/load-filters";
import { request } from "@/server-lib/services";

export async function getFilters(): Promise<LoadFilters.Embedded> {
  const { data } = await request.get<LoadFilters.Embedded>(`/filters`);
  return data;
}
