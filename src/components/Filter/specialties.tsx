import React from "react";
import { useFilter } from "./context";
import { Stack, Text, CheckboxGroup, Checkbox } from "@chakra-ui/react";

type Props = {
  specialties: string[];
};

const Specialties: React.FC<Props> = ({ specialties }: Props) => {
  const { updateSpecialties, state } = useFilter();

  return (
    <Stack rowGap={2}>
      <Text fontWeight="semibold" fontSize="14">
        Especialidades
      </Text>

      <CheckboxGroup
        onChange={(specialties) => updateSpecialties(specialties as string[])}
        colorScheme="blue"
        value={state.specialties}
      >
        <Stack>
          {specialties.map((specialty, key) => (
            <Checkbox key={key} value={specialty}>
              <Text fontSize="12" fontWeight="normal" color="gray.300">
                {specialty}
              </Text>
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Stack>
  );
};

export default Specialties;
