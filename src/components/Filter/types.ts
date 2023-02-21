export enum Type {
  "UPDATE_LOCATION" = "UPDATE_LOCATION",
  "UPDATE_AVAILABILITIES" = "UPDATE_AVAILABILITIES",
  "UPDATE_SPECIALTIES" = "UPDATE_SPECIALTIES",
  "UPDATE_WORKING_MODEL" = "UPDATE_WORKING_MODEL",
  "UPDATE_SALARY" = "UPDATE_SALARY",
  "RESET_STATE" = "RESET_STATE",
  "UPDATE_SEARCH" = "UPDATE_SEARCH",
}

export type Salary = {
  min: number;
  max: number;
};

export interface State {
  location: string;
  availabilities: string[];
  specialties: string[];
  workingModel: string;
  salary: Salary;
  search: string;
}

type ActionReturnType<A extends Type, T = any> = {
  type: A;
  payload: T;
};

export type UpdateLocationAction = ActionReturnType<
  Type.UPDATE_LOCATION,
  string
>;

export type UpdateAvailabilitiesAction = ActionReturnType<
  Type.UPDATE_AVAILABILITIES,
  string[]
>;

export type UpdateSpecialtiesAction = ActionReturnType<
  Type.UPDATE_SPECIALTIES,
  string[]
>;

export type UpdateWorkingModelAction = ActionReturnType<
  Type.UPDATE_WORKING_MODEL,
  string
>;

export type UpdateSalaryAction = ActionReturnType<Type.UPDATE_SALARY, Salary>;

export type ResetStateAction = ActionReturnType<Type.RESET_STATE, null>;

export type UpdateSearchAction = ActionReturnType<Type.UPDATE_SEARCH, string>;

export type Action =
  | UpdateLocationAction
  | UpdateAvailabilitiesAction
  | UpdateSpecialtiesAction
  | UpdateWorkingModelAction
  | UpdateSalaryAction
  | ResetStateAction
  | UpdateSearchAction;
