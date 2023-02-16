import {
  Badge,
  Box,
  Flex,
  HStack,
  Stack,
  Text,
  useBoolean,
  useColorModeValue,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo } from "react";
import SkeletonCardVacancies from "./skeleton";

type Props = {
  index: number;
  logo?: string;
  title: string;
  salary: {
    min: number;
    max: number;
  }
  description: string;
  tags: string[]
  createdAt: Date;
  workModel: string;
};


const CardVacancies: React.FC<Props> = ({ index = 0, logo = "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg", title, description, salary, tags, workModel, createdAt }) => {
  const [open, setOpen] = useBoolean();

  useEffect(() => {
    setTimeout(() => {
      setOpen.on();
    }, 500);
  }, [setOpen]);

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

  const currencyFormat = useCallback((currency: number) =>
    currency.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
    [])

  const dateFormated = useMemo(() => formatDistance(createdAt, new Date(), { addSuffix: true, locale: pt }), [createdAt])
  const compositionSalary = useMemo(() => `${currencyFormat(salary.min)}-${currencyFormat(salary.max)}`, [salary])

  return (
    <Box
      bg="gray.50"
      padding="5"
      borderRadius={{ base: "sm", lg: "xl" }}
      minHeight={260}
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      {open ? (
        <>
          <Flex
            as={motion.div}
            variants={item}
            initial={"hidden"}
            animate={"visible"}
          >
            <Image
              src={logo}
              alt="Workflow"
              width={40}
              height={40}
            />
            <Flex flexDirection="column" ml={{ base: "4" }}>
              <Stack
                alignItems={{ lg: "center" }}
                direction={{ base: "column", lg: "row" }}
              >
                <Text fontWeight="medium" _after={{ lg: { content: `" •"` } }}>
                  {title}
                </Text>
                <Text
                  marginLeft="4"
                  fontWeight="normal"
                  fontSize="12"
                  color="gray.300"
                >
                  {dateFormated}
                </Text>
              </Stack>
              <HStack mt="2">
                <Text color="gray.300" fontSize="12" fontWeight="normal">
                  {`Sálario: ${compositionSalary} - ${workModel}`}
                </Text>
              </HStack>
            </Flex>
          </Flex>
          <Stack
            as={motion.div}
            variants={item}
            initial={"hidden"}
            animate={"visible"}
            mt="4"
          >
            <Text fontWeight="normal" fontSize="12">
              {description}
            </Text>

            <Flex flexDirection={{ base: "column", md: "row" }} alignItems={{ base: "start", md: "center" }} >
              {tags.map(
                (tag, key) => (
                  <Badge p={{ base: 0, md: 1 }} key={key} _notFirst={{ marginLeft: { md: 3, base: 0 }, marginTop: { base: 2, md: 0 } }} >
                    <Text fontWeight="medium" fontSize="12">
                      {tag}
                    </Text>
                  </Badge>
                )
              )}
            </Flex>
          </Stack>
        </>
      ) : (
        <SkeletonCardVacancies />
      )
      }
    </Box >
  );
};

export default CardVacancies;
