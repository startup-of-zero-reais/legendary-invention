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

export async function searchLocation(zip: string): Promise<any> {
  const { data } = await request.get(`/locations`, { params: { zip } })
    .catch(handleSearchError)

  return data.city
}

function handleSearchError(err: AxiosError) {
  console.log(`fail searching location, reson: ${err.message}`)
  return { data: { city: null } }
}