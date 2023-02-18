import { Flex, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import Header from "./header";
import SkeletonCardVacancy from "./skeleton";
import { Techs } from "@/components";
import { JobModel } from "@/domain";

type Props = {
  index: number;
  job: JobModel;
  isLoading: boolean;
};

const CardVacancy: React.FC<Props> = ({ index = 0, isLoading, job }) => {
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

  return isLoading ? (
    <SkeletonCardVacancy />
  ) : (
    <Flex
      as={Link}
      scroll={false}
      href={`/?vaga=${id}`}
      flexDir={"column"}
      bg="gray.50"
      padding="5"
      borderRadius={{ base: "sm", lg: "xl" }}
      minHeight={260}
      border="1px"
      borderColor={"gray.200"}
    >
      <Header
        {...{
          createdAt,
          salary,
          title,
          workModel,
          item,
          logo: company?.logo || "",
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
        <Text fontWeight="normal" fontSize="12" flex={1}>
          {description}
        </Text>

        <Techs techs={techs} />
      </Stack>
    </Flex>
  );
};

export default CardVacancy;
