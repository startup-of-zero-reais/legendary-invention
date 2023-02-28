import React from "react";
import { Checkbox, CheckboxGroup, Stack, Text } from "@chakra-ui/react";
import { useFilter } from "./context";

type Props = {
  contracts: string[];
};

const Availabilities: React.FC<Props> = ({ contracts }: Props) => {
  const { state, updateContracts } = useFilter();

  return (
    <Stack mt="24px">
      <Text fontWeight="semibold" fontSize="14" mb="4">
        Regime de Contrato
      </Text>

      <CheckboxGroup
        onChange={(contracts) => updateContracts(contracts as string[])}
        value={state.contracts}
        colorScheme="blue"
      >
        <Stack>
          {contracts.map((contract, key) => (
            <Checkbox key={key} value={contract}>
              <Text fontWeight="normal" fontSize="12" color="gray.300">
                {contract}
              </Text>
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Stack>
  );
};

export default Availabilities;
