import { Flex, Stack, Text, useTheme } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useMemo } from "react";
import Header from "./header";
import SkeletonCardVacancy from "./skeleton";
import { Techs } from "@/components";
import { JobModel } from "@/domain";
import { useFilter } from "../Filter/context";

type Props = {
  index: number;
  job: JobModel;
  isLoading: boolean;
};

const CardVacancy: React.FC<Props> = ({ index = 0, isLoading, job }) => {
  const theme = useTheme()
  const { alreadyApplied } = useFilter()

  const {
    id,
    createdAt,
    company,
    description,
    salary,
    title,
    techs = ["Go Lang", "PHP", "Node"],
    workModel = "Home Office",
  } = job;

  const item = {
    hidden: {
      opacity: 0,
      y: "20%",
    },
    visible: {
      opacity: 1,
      y: "0",
      transition: {
        duration: 0.5,
        delay: 0.2 * index,
      },
    },
  };

  const isApplied = useMemo(() => alreadyApplied(id), [alreadyApplied, id])

  return isLoading ? (
    <SkeletonCardVacancy />
  ) : (
    <Flex
      flexDir={"column"}
      bgImg={`linear-gradient(0,
        ${theme.colors.gray[50]}80,
        ${theme.colors.gray[50]}60
      )`}
      padding={4}
      borderRadius={{ base: "sm", lg: "lg" }}
      minHeight={260}
      border="1px"
      borderColor={"gray.100"}
      _hover={{ shadow: "md" }}
      transition="all 200ms ease-in-out"
    >
      <Header
        {...{
          id,
          createdAt,
          salary,
          title,
          workModel,
          item,
          logo: company?.logo || "",
          isApplied,
        }}
      />
      
      <Stack
        as={motion.div}
        variants={item}
        initial={"hidden"}
        animate={"visible"}
        mt="4"
        flex={1}
      >
        <Text
          fontWeight="normal"
          fontSize="12"
          flex={1}
          as={Link}
          scroll={false}
          href={`/?vaga=${id}`}
        >
          {description}
        </Text>

        <Techs techs={techs} />
      </Stack>
    </Flex>
  );
};

export default React.memo(CardVacancy);
