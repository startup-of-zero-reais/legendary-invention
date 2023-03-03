import { useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";
import CardVacancy from "../CardVacancy";
import { useFilter } from "../Filter/context";

const WrapListVacancies: React.FC = () => {
  const { jobs, isLoading } = useFilter();

  return (
    <VStack
      p={{ base: 2, md: 3, lg: 4 }}
      gap={{ base: 0, md: 2 }}
      bg="white"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius={{ base: "md", lg: "xl" }}
      alignItems={"stretch"}
    >
      {jobs?.map((job, key) => (
        <CardVacancy index={key} key={key} job={job} isLoading={isLoading} />
      ))}
    </VStack>
  );
};

export default WrapListVacancies;
