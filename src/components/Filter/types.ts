export enum Type {
  "UPDATE_LOCATION" = "UPDATE_LOCATION",
  "UPDATE_CONTRACTS" = "UPDATE_CONTRACTS",
  "UPDATE_SPECIALTIES" = "UPDATE_SPECIALTIES",
  "UPDATE_AVAILABILITY" = "UPDATE_AVAILABILITY",
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
  contracts: string[];
  specialties: string[];
  availability: string;
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

export type UpdateContractsAction = ActionReturnType<
  Type.UPDATE_CONTRACTS,
  string[]
>;

export type UpdateSpecialtiesAction = ActionReturnType<
  Type.UPDATE_SPECIALTIES,
  string[]
>;

export type UpdateAvailabilityAction = ActionReturnType<
  Type.UPDATE_AVAILABILITY,
  string
>;

export type UpdateSalaryAction = ActionReturnType<Type.UPDATE_SALARY, Salary>;

export type ResetStateAction = ActionReturnType<Type.RESET_STATE, null>;

export type UpdateSearchAction = ActionReturnType<Type.UPDATE_SEARCH, string>;

export type Action =
  | UpdateLocationAction
  | UpdateContractsAction
  | UpdateSpecialtiesAction
  | UpdateAvailabilityAction
  | UpdateSalaryAction
  | ResetStateAction
  | UpdateSearchAction;
