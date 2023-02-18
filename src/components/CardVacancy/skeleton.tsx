import React from "react";
import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const SkeletonCardVacancy: React.FC = () => {
  return (
    <Box
      bg="white"
      padding="5"
      borderRadius={{ base: "sm", lg: "xl" }}
      minHeight={260}
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Flex flexDir={"row"}>
        <SkeletonCircle size="10" flexShrink={0} />
        <VStack width={"full"} mx={4} my={2}>
          <Skeleton height={2} width="100%" />
          <Skeleton height={2} width="100%" />
        </VStack>
      </Flex>
      {[0, 1, 2, 3, 4].map((_, index) => (
        <Skeleton key={index} mt={4} height={2} width="calc(100% - 16px)" />
      ))}

      <VStack
        mt={5}
        flexDir={"row"}
        flexWrap={"wrap"}
        alignItems={{ base: "start", md: "center" }}
        gap={2}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
          <Skeleton key={index} width={10} height={2} _first={{ mt: 2 }} />
        ))}
      </VStack>
    </Box>
  );
};

export default SkeletonCardVacancy;
