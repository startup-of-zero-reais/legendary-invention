import { JobModel } from "@/domain";
import { useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";
import CardVacancy from "../CardVacancy";
import { useFilter } from "../Filter/context";

const WrapListVacancies: React.FC = () => {
  const { jobs, isLoading } = useFilter();

  return (
    <VStack
      p={{ base: "2", md: "4", lg: "6" }}
      gap={{ base: 0, md: 2, lg: 4 }}
      bg="white"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius={{ base: "md", lg: "2xl" }}
      alignItems={"stretch"}
    >
      {jobs?.map((job, key) => (
        <CardVacancy index={key} key={key} job={job} isLoading={isLoading} />
      ))}
    </VStack>
  );
};

export default WrapListVacancies;
