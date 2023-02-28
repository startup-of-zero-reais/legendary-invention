import { LoadLocations } from "@/domain/usecases/load-locations";
import { request } from "@/server-lib/services";

export async function locations(): Promise<LoadLocations.Embedded> {
  const { data } = await request.get<LoadLocations.Embedded>(`/locations`);
  return data;
}
