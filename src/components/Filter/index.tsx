import React, { useEffect, useState } from "react";

import Checkbox from "../Checkbox";
import {
  Box,
  Button,
  Flex,
  Select,
  Stack,
  Text,
  useCheckboxGroup,
  useColorModeValue,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { RangeSlider, RadioGroup } from "@/components";

type Filter = {
  minSalary: number;
  maxSalary: number;
  specialties: string[];
  availabilities: string[];
  location: string;
  workModel: string;
};

type Location = {
  id: string;
  name: string;
};
type Props = {
  locations: Location[];
  availabilities: string[];
  specialties: string[];
  workingModels: string[];

  receivedFilterValues: (filter: Filter) => void;
};

const Filter: React.FC<Props> = ({
  locations,
  availabilities,
  specialties,
  workingModels,
  receivedFilterValues,
}: Props) => {
  const [workModel, setWorkModel] = useState("");
  const [location, setLocation] = useState("");

  const {
    value: valueSpecialties,
    getCheckboxProps: getSpecialtiesCheckboxProps,
  } = useCheckboxGroup();
  const {
    value: valueAvailabilities,
    getCheckboxProps: getAvailabilitiesCheckboxProps,
  } = useCheckboxGroup();

  useEffect(() => {
    receivedFilterValues({
      availabilities: valueAvailabilities as string[],
      specialties: valueSpecialties as string[],
      location,
      maxSalary: 0,
      minSalary: 0,
      workModel,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSpecialties, valueAvailabilities, location, workModel]);

  return (
    <Box
      transition="3s ease"
      width="300px"
      bg="white"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      h="full"
      px="5"
      py="5"
      borderRadius="2xl"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontWeight="bold">Filter</Text>
        <Button size="xs">
          Clear all
          <SmallCloseIcon />
        </Button>
      </Flex>

      <Stack mt="24px">
        <Text fontWeight="bold" fontSize="12">
          Location
        </Text>
        <Select
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Select option"
          size="xs"
        >
          {locations.map((city, key) => (
            <option key={key} value={city.name}>
              {city.name}
            </option>
          ))}
        </Select>
      </Stack>
      <Stack mt="24px">
        <Text fontWeight="bold" fontSize="12" mb="4">
          Regime de Contrato
        </Text>

        {availabilities.map((availability, key) => (
          <Checkbox
            key={key}
            {...getAvailabilitiesCheckboxProps({ value: availability })}
          />
        ))}
      </Stack>

      <Stack mt="24px">
        <Text fontWeight="bold" fontSize="12" mb="4">
          Especialidades
        </Text>

        {specialties.map((specialty, key) => (
          <Checkbox
            key={key}
            {...getSpecialtiesCheckboxProps({ value: specialty })}
          />
        ))}
      </Stack>

      <Stack mt="24px">
        <Text fontWeight="bold" fontSize="12" mb="4">
          Modelo de Trabalho
        </Text>

        <RadioGroup
          options={workingModels}
          onChange={(model) => setWorkModel(model)}
        />
      </Stack>

      <Stack mt="24px">
        <Text fontWeight="bold" fontSize="12" mb="4">
          Salário
        </Text>
        <RangeSlider
          minMaxValue={([min, max]) => console.log(min, max)}
          min={2000}
          max={50000}
          defaultValue={[3000, 40000]}
          stepByNumber={0}
          stepToIndex={0}
          stepToNumber={0}
          // eslint-disable-next-line jsx-a11y/aria-proptypes
          aria-label={["any", "any"]}
          key={0}
        />
      </Stack>
    </Box>
  );
};

export default Filter;
