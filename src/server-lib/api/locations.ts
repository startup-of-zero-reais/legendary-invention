import { LoadLocations } from "@/domain/usecases/load-locations";
import { request } from "@/server-lib/services";
import { AxiosError } from "axios";

export async function getLocations(): Promise<LoadLocations.Locations> {
  const { data } = await request.get<LoadLocations.Embedded>(`/locations`)
    .catch(handleError);
  return data._embedded;
}

function handleError(err: AxiosError) {
  console.log(`fail getting locations, reason: ${err.message}`)
  return { data: { _embedded: [] } }
}