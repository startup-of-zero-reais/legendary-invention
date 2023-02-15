import React from "react";
import { useFilter } from "./context";
import { Stack, Text, CheckboxGroup, Checkbox } from "@chakra-ui/react";

type Props = {
  specialties: string[];
};

const Specialties: React.FC<Props> = ({ specialties }: Props) => {
  const { updateSpecialties, state } = useFilter();

  return (
    <Stack mt="24px">
      <Text fontWeight="bold" fontSize="14" mb="4">
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
              <Text fontSize="14" fontWeight="medium">
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
