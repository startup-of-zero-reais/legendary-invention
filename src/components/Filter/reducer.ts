import { CONSTANTS } from "@/constants";
import { Action, State, Type } from "./types";

export const initialState: State = {
  search: "",
  specialties: [],
  contracts: [],
  location: "",
  availability: "",
  salary: {
    max: CONSTANTS.initial_price.max,
    min: CONSTANTS.initial_price.min,
  },
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case Type.UPDATE_LOCATION:
      return { ...state, location: action.payload };
    case Type.UPDATE_CONTRACTS:
      return { ...state, contracts: action.payload };
    case Type.UPDATE_SPECIALTIES:
      return { ...state, specialties: action.payload };
    case Type.UPDATE_AVAILABILITY:
      return { ...state, availability: action.payload };
    case Type.UPDATE_SALARY:
      return { ...state, salary: action.payload };
    case Type.UPDATE_SEARCH:
      return { ...state, search: action.payload };
    case Type.RESET_STATE:
      return initialState;
    default:
      throw new Error(`Unknown action`);
  }
}
