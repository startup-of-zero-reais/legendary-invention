import { CONSTANTS } from "@/constants";
import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import RangeSlider from "../RangeSlider";
import { useFilter } from "./context";

const Salary: React.FC = () => {
  const { updateSalary, isClearAll } = useFilter();

  return (
    <Stack mt="24px">
      <Text fontWeight="bold" fontSize="14" mb="4">
        Salário
      </Text>
      <RangeSlider
        reset={isClearAll}
        minMaxValue={([min, max]) => updateSalary({ max, min })}
        min={CONSTANTS.price_filter[0]}
        max={CONSTANTS.price_filter[1]}
        defaultValue={[10000, 40000]}
        stepByNumber={0}
        stepToIndex={0}
        stepToNumber={0}
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-label={["Min reais", "Max reais"]}
        key={0}
      />
    </Stack>
  );
};

export default Salary;
