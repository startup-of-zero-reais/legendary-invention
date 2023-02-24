import { locations } from "@/api/locations";
import { useQuery } from "react-query";
import { EmbeddedLocations } from "../models/location";

export namespace LoadLocations {
    export type Embedded = EmbeddedLocations
}

export const useLoadLocations = () =>
    useQuery<EmbeddedLocations>(['@loadlocations'], locations, { cacheTime: 1000 * 60 * 60 * 24, refetchOnMount: false })