import React from "react";
import { Stack, Text, Select, IconButton, HStack } from "@chakra-ui/react";
import { useFilter } from "./context";
import { HiX } from "react-icons/hi";

const Location: React.FC = () => {
  const { updateLocation, state, isExpanded, locations } = useFilter();

  return (
    <Stack mt={{ base: isExpanded ? 6 : 0 }}>
      <Text fontWeight="semibold" fontSize="14">
        Localização
      </Text>
      
      <HStack>
        <Select
          onChange={(e) => updateLocation(e.target.value)}
          placeholder="Selecione uma opção..."
          size="xs"
          value={state.location}
        >
          {locations.map((city, key) => (
            <option key={key} value={city.name}>
              {city.name}
            </option>
          ))}
        </Select>

        <IconButton
          size={"xs"}
          aria-label="limpar localidade"
          icon={<HiX />}
          onClick={() => updateLocation("")}
          variant="ghost"
          isDisabled={!state.location}
          _disabled={{ cursor: "not-allowed" }}
        />
      </HStack>
    </Stack>
  );
};

export default Location;
