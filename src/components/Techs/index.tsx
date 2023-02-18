import { Badge, Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  techs: string[];
};

const Techs: React.FC<Props> = ({ techs }) => {
  return (
    <Flex
      flexDirection={{ base: "column", md: "row" }}
      alignItems={{ base: "start", md: "center" }}
    >
      {techs.map((tech, key) => (
        <Badge
          p={{ base: 0, md: 1 }}
          key={key}
          _notFirst={{
            marginLeft: { md: 3, base: 0 },
            marginTop: { base: 2, md: 0 },
          }}
        >
          <Text fontWeight="medium" fontSize="12">
            {tech}
          </Text>
        </Badge>
      ))}
    </Flex>
  );
};

export default Techs;
