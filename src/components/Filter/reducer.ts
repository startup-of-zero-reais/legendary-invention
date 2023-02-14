import { Action, State, Type } from "./types";

export const initialState: State = {
  specialties: [],
  availabilities: [],
  location: "",
  workingModel: "",
  salary: {
    max: 0,
    min: 0,
  },
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case Type.UPDATE_LOCATION:
      return { ...state, location: action.payload };
    case Type.UPDATE_AVAILABILITIES:
      return { ...state, availabilities: action.payload };
    case Type.UPDATE_SPECIALTIES:
      return { ...state, specialties: action.payload };
    case Type.UPDATE_WORKING_MODEL:
      return { ...state, workingModel: action.payload };
    case Type.UPDATE_SALARY:
      return { ...state, salary: action.payload };
    case Type.RESET_STATE:
      return initialState;
    default:
      throw new Error(`Unknown action`);
  }
}
