import React from "react";

import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";

// @Component Internal Applicaiton
import Location from "./location";
import Specialties from "./specialties";
import Availability from "./availability";
import Salary from "./salary";
import Header from "./header";
import Contracts from "./contracts";

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
  contracts: string[];
  specialties: string[];
  availability: string[];
};

const Filter: React.FC<Props> = ({
  specialties,
  contracts,
  availability,
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
        <Location />

        <Contracts contracts={contracts} />

        <Specialties specialties={specialties} />

        <Availability availability={availability} />

        <Salary />
      </Stack>
    </Box>
  );
};

const FilterWrap = () => {
  return (
    <Box>
      <Filter
        availability={availability}
        contracts={contracts}
        specialties={specialties}
      />
    </Box>
  );
};

// TODO - Remove get this from the API

const availability = ["Home office", "Híbrido", "Presencial"];

const contracts = ["CLT", "Temporário", "Estágio", "Flex", "Autonomo"];

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
