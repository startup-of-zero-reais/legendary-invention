import { Stack, Text, RadioGroup, Radio } from "@chakra-ui/react";
import React from "react";
import { useFilter } from "./context";

type Props = {
  workingModels: string[];
};

const WorkingModel: React.FC<Props> = ({ workingModels }: Props) => {
  const { state, updateWorkingModel } = useFilter();

  return (
    <Stack mt="24px">
      <Text fontWeight="semibold" fontSize="14" mb="4">
        Modelo de Trabalho
      </Text>

      <RadioGroup onChange={updateWorkingModel} value={state.workingModel}>
        <Stack>
          {workingModels.map((model, index) => (
            <Radio key={index} value={model}>
              <Text fontSize="12" fontWeight="normal" color="gray.300">
                {model}
              </Text>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Stack>
  );
};

export default WorkingModel;
