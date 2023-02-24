import {
  ResetStateAction,
  Salary,
  Type,
  UpdateContractsAction,
  UpdateLocationAction,
  UpdateSalaryAction,
  UpdateSearchAction,
  UpdateSpecialtiesAction,
  UpdateAvailabilityAction,
} from "./types";

export function updateLocationAction(payload: string): UpdateLocationAction {
  return {
    type: Type.UPDATE_LOCATION,
    payload,
  };
}

export function updateContractsAction(
  payload: string[]
): UpdateContractsAction {
  return {
    type: Type.UPDATE_CONTRACTS,
    payload,
  };
}

export function updateSpecialtiesAction(
  payload: string[]
): UpdateSpecialtiesAction {
  return {
    type: Type.UPDATE_SPECIALTIES,
    payload,
  };
}

export function updateAvailabilityAction(
  payload: string
): UpdateAvailabilityAction {
  return {
    type: Type.UPDATE_AVAILABILITY,
    payload,
  };
}

export function updateSalaryAction(payload: Salary): UpdateSalaryAction {
  return {
    type: Type.UPDATE_SALARY,
    payload,
  };
}

export function resetState(): ResetStateAction {
  return {
    type: Type.RESET_STATE,
    payload: null,
  };
}

export function updateSearchAction(payload: string): UpdateSearchAction {
  return {
    type: Type.UPDATE_SEARCH,
    payload,
  };
}
