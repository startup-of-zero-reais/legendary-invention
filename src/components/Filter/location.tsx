import React from "react";
import { Stack, Text, Select } from "@chakra-ui/react";
import { useFilter } from "./context";

type Location = {
  id: string;
  name: string;
};

type Props = {
  locations: Location[];
};

const Location: React.FC<Props> = ({ locations }: Props) => {
  const { updateLocation, state } = useFilter();

  return (
    <Stack mt="24px">
      <Text fontWeight="bold" fontSize="14">
        Localização
      </Text>
      <Select
        onChange={(e) => updateLocation(e.target.value)}
        placeholder="Select option"
        size="xs"
        value={state.location}
      >
        {locations.map((city, key) => (
          <option key={key} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>
    </Stack>
  );
};

export default Location;
