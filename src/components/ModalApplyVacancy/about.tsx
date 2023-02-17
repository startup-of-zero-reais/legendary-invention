import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useApply } from "./context";

const About: React.FC = () => {
  const { description } = useApply();

  return (
    <VStack alignItems={"start"} my={10}>
      <Text fontSize={14} fontWeight={"semibold"}>
        Sobre a vaga
      </Text>

      <Text color={"gray.300"} fontSize={12} fontWeight={"normal"}>
        {description}
      </Text>
    </VStack>
  );
};

export default About;
