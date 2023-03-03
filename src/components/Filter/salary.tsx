import { CONSTANTS } from "@/lib/constants";
import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import RangeSlider from "../RangeSlider";
import { useFilter } from "./context";

const Salary: React.FC = () => {
  const { updateSalary, isClearAll } = useFilter();

  return (
    <Stack rowGap={2}>
      <Text fontWeight="bold" fontSize="14">
        Salário
      </Text>
      
      <RangeSlider
        reset={isClearAll}
        minMaxValue={([min, max]) => updateSalary({ max, min })}
        min={CONSTANTS.price_filter[0]}
        max={CONSTANTS.price_filter[1]}
        defaultValue={[
          CONSTANTS.initial_price.min,
          CONSTANTS.initial_price.max,
        ]}
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
