import { LoadAllJob } from "@/domain";
import { Filters } from "@/domain/models/filters";
import { Location } from "@/domain/models/location";
import { getJobs } from "@/server-lib/api/jobs";
import { useMediaQuery } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useReducer, useState } from "react";
import { useQuery } from "react-query";
import {
  resetState,
  updateContractsAction,
  updateLocationAction,
  updateSalaryAction,
  updateSearchAction,
  updateSpecialtiesAction,
  updateAvailabilityAction,
} from "./actions";
import { initialState, reducer } from "./reducer";
import { Salary, State } from "./types";

interface FilterContextProps {
  filters: Filters.Embedded["_embedded"];
  locations: Location[];
  appliedJobs: string[];
}

interface WithChildrenProps extends FilterContextProps {
  children: React.ReactNode;
}

interface FilterProviderProps {
  updateLocation: (location: string) => void;
  updateContracts: (contracts: string[]) => void;
  updateSpecialties: (specialties: string[]) => void;
  updateAvailability: (availability: string) => void;
  updateSalary: (salary: Salary) => void;
  updateClearAll: (clearAll: boolean) => void;
  updateExpanded: (expanded: boolean) => void;
  updateSearch: (search: string) => void;
  alreadyApplied: (jobID: string) => boolean;
  locations: Location[];
  filters: Filters.Embedded["_embedded"];
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
    availability: rest.availability,
    contracts: rest.contracts.join(","),
    techs: rest.specialties.join(","),
    location: rest.location,
  };
};

export function FilterProvider({
  children,
  filters,
  locations,
  appliedJobs,
}: WithChildrenProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [clearAll, setClearAll] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { data, isLoading } = useQuery(
    ["@loadAlljobs", parseState(state)],
    async () =>  await getJobs(parseState(state)),
    { retry: 0 }
  );

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

  const updateContracts = (contracts: string[]) =>
    dispatch(updateContractsAction(contracts));

  const updateSpecialties = (specialties: string[]) =>
    dispatch(updateSpecialtiesAction(specialties));

  const updateAvailability = (availability: string) =>
    dispatch(updateAvailabilityAction(availability));

  const updateSearch = (search: string) => dispatch(updateSearchAction(search));

  const updateSalary = (salary: Salary) => dispatch(updateSalaryAction(salary));

  const updateClearAll = (clearAll: boolean) => setClearAll(clearAll);

  const updateExpanded = (expanded: boolean) => setExpanded(expanded);

  const alreadyApplied = useCallback((jobID: string) => {
    return Boolean(appliedJobs.find(id => id === jobID))
  }, [appliedJobs])

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
        updateContracts,
        updateSpecialties,
        updateAvailability,
        updateSalary,
        updateSearch,
        updateClearAll,
        updateExpanded,
        filters,
        isExpanded: expanded,
        isClearAll: clearAll,
        state,
        jobs: data as LoadAllJob.Model,
        isLoading,
        locations,
        alreadyApplied,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
