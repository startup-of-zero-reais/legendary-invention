import { LoadFilters } from "@/domain/usecases/load-filters";
import { request } from "@/request";

export async function filters(): Promise<LoadFilters.Embedded> {
    const { data } = await request.get<LoadFilters.Embedded>(`/filters`)
    return data
}