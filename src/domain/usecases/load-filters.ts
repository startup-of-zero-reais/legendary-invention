import { filters } from "@/api/filters";
import { useQuery } from "react-query";
import { Filters } from "../models/filters";

export namespace LoadFilters {
    export type NamedFilter = Filters.NamedFilter
    export type Embedded = Filters.Embedded
}

export const useLoadFilters = () => useQuery<LoadFilters.Embedded>(['@loadFilters'], filters)