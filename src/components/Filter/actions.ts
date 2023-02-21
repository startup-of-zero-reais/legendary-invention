import {
  ResetStateAction,
  Salary,
  Type,
  UpdateAvailabilitiesAction,
  UpdateLocationAction,
  UpdateSalaryAction,
  UpdateSearchAction,
  UpdateSpecialtiesAction,
  UpdateWorkingModelAction,
} from "./types";

export function updateLocationAction(payload: string): UpdateLocationAction {
  return {
    type: Type.UPDATE_LOCATION,
    payload,
  };
}

export function updateAvailabilitiesAction(
  payload: string[]
): UpdateAvailabilitiesAction {
  return {
    type: Type.UPDATE_AVAILABILITIES,
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

export function updateWorkingModelAction(
  payload: string
): UpdateWorkingModelAction {
  return {
    type: Type.UPDATE_WORKING_MODEL,
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
