import React from "react";
import { Checkbox, CheckboxGroup, Stack, Text } from "@chakra-ui/react";
import { useFilter } from "./context";

type Props = {
  availabilities: string[];
};

const Availabilities: React.FC<Props> = ({ availabilities }: Props) => {
  const { state, updateAvailabilities } = useFilter();

  return (
    <Stack mt="24px">
      <Text fontWeight="bold" fontSize="14" mb="4">
        Regime de Contrato
      </Text>

      <CheckboxGroup
        onChange={(availabilities) =>
          updateAvailabilities(availabilities as string[])
        }
        value={state.availabilities}
        colorScheme="blue"
      >
        <Stack>
          {availabilities.map((availability, key) => (
            <Checkbox key={key} value={availability}>
              <Text fontSize="14" fontWeight="medium">
                {availability}
              </Text>
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Stack>
  );
};

export default Availabilities;
