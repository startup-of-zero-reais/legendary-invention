import { LoadAllJob, useLoadAllJob } from "@/domain";
import { useMediaQuery } from "@chakra-ui/react";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  resetState,
  updateAvailabilitiesAction,
  updateLocationAction,
  updateSalaryAction,
  updateSearchAction,
  updateSpecialtiesAction,
  updateWorkingModelAction,
} from "./actions";
import { initialState, reducer } from "./reducer";
import { Salary, State } from "./types";

interface WithChildrenProps {
  children: React.ReactNode;
}

interface FilterProviderProps {
  updateLocation: (location: string) => void;
  updateAvailabilities: (availabilities: string[]) => void;
  updateSpecialties: (specialties: string[]) => void;
  updateWorkingModel: (workingModel: string) => void;
  updateSalary: (salary: Salary) => void;
  updateClearAll: (clearAll: boolean) => void;
  updateExpanded: (expanded: boolean) => void;
  updateSearch: (search: string) => void;
  jobs: LoadAllJob.Model;
  isLoading: boolean;
  isExpanded: boolean;
  isClearAll: boolean;
  state: State;
}

const FilterContext = React.createContext<FilterProviderProps>(
  {} as FilterProviderProps
);

const parseState = (state: State) => {
  const { salary, ...rest } = state;

  return {
    search: rest.search,
    minSalary: salary.min,
    maxSalary: salary.max,
    contracts: rest.availabilities.join(","),
    availability: rest.workingModel,
  };
};

export function FilterProvider({ children }: WithChildrenProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [clearAll, setClearAll] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { data, isLoading } = useLoadAllJob(parseState(state));

  const [isLargerThan992] = useMediaQuery("(min-width: 992px)", {
    ssr: true,
    fallback: false,
  });

  const [isSmallerThan992] = useMediaQuery("(max-width: 992px)", {
    ssr: true,
    fallback: false,
  });

  const updateLocation = (location: string) =>
    dispatch(updateLocationAction(location));

  const updateAvailabilities = (availabilities: string[]) =>
    dispatch(updateAvailabilitiesAction(availabilities));

  const updateSpecialties = (specialties: string[]) =>
    dispatch(updateSpecialtiesAction(specialties));

  const updateWorkingModel = (workingModel: string) =>
    dispatch(updateWorkingModelAction(workingModel));

  const updateSearch = (search: string) => dispatch(updateSearchAction(search));

  const updateSalary = (salary: Salary) => dispatch(updateSalaryAction(salary));

  const updateClearAll = (clearAll: boolean) => setClearAll(clearAll);

  const updateExpanded = (expanded: boolean) => setExpanded(expanded);

  useEffect(() => {
    if (!clearAll) return;
    dispatch(resetState());
    setClearAll(false);
  }, [clearAll]);

  useEffect(() => {
    if (isLargerThan992) {
      setExpanded(true);
    }

    if (isSmallerThan992) {
      setExpanded(false);
    }
  }, [isLargerThan992, isSmallerThan992]);

  return (
    <FilterContext.Provider
      value={{
        updateLocation,
        updateAvailabilities,
        updateSpecialties,
        updateWorkingModel,
        updateSalary,
        updateSearch,
        updateClearAll,
        updateExpanded,
        isExpanded: expanded,
        isClearAll: clearAll,
        state,
        jobs: (data as LoadAllJob.Model) || [],
        isLoading,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
