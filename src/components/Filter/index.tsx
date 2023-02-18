import React from "react";

import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";

// @Component Internal Applicaiton
import Location from "./location";
import Specialties from "./specialties";
import WorkingModel from "./working-model";
import Salary from "./salary";
import Header from "./header";
import Availabilities from "./availabilities";

import { FilterProvider, useFilter } from "./context";

type Filter = {
  minSalary: number;
  maxSalary: number;
  specialties: string[];
  availabilities: string[];
  location: string;
  workModel: string;
};

type Props = {
  availabilities: string[];
  specialties: string[];
  workingModels: string[];
  locations: Location[];
};

const Filter: React.FC<Props> = ({
  locations,
  specialties,
  availabilities,
  workingModels,
}: Props) => {
  const { isExpanded } = useFilter();

  const variants: Variants = {
    open: { height: "auto", visibility: "visible", opacity: 1 },
    closed: { height: "0", visibility: "hidden", opacity: 0 },
  };

  return (
    <Box
      transition="200ms ease"
      width={{ base: "full", lg: "300px" }}
      bg="white"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      minHeight={{ lg: "780px", base: 0 }}
      flexShrink={0}
      flexGrow={0}
      p={{ base: 4, lg: 6 }}
      borderRadius={{ base: "md", lg: "2xl" }}
    >
      <Header />

      <Stack
        as={motion.div}
        initial={"closed"}
        style={{ backgroundColor: "white" }}
        animate={isExpanded ? "open" : "closed"}
        variants={variants}
        transition={{ type: "easeInOut" }}
      >
        <Location locations={locations} />

        <Availabilities availabilities={availabilities} />

        <Specialties specialties={specialties} />

        <WorkingModel workingModels={workingModels} />

        <Salary />
      </Stack>
    </Box>
  );
};

const FilterWrap = () => {
  return (
    <FilterProvider>
      <Filter
        workingModels={workingModels}
        availabilities={availabilities}
        specialties={specialties}
        locations={locations}
      />
    </FilterProvider>
  );
};

// TODO - Remove get this from the API

const workingModels = ["Home office", "Híbrido", "Presencial"];

const availabilities = ["Freelance", "Full Time", "PJ", "CLT"];

const specialties = [
  "Frontend",
  "Backend",
  "Mobile",
  "Full stack",
  "UI Designer",
  "UX Designer",
];

const locations = [
  {
    id: "any_id_1",
    name: "Goiânia",
  },
  {
    id: "any_id_2",
    name: "São Paulo",
  },
  {
    id: "any_id_3",
    name: "Rio de Janeiro",
  },
  {
    id: "any_id_4",
    name: "Florianópolis",
  },
  {
    id: "any_id_5",
    name: "Chapecó",
  },
];

export default FilterWrap;
