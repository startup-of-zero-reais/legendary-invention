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
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {
  index: number;
};

const CardVacancies: React.FC<Props> = ({ index = 0 }) => {
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
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
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
                  Create Figma Designs for Web Application
                </Text>
                <Text
                  marginLeft="4"
                  fontWeight="normal"
                  fontSize="12"
                  color="gray.300"
                >
                  2 Hours ago
                </Text>
              </Stack>
              <HStack mt="2">
                <Text color="gray.300" fontSize="12" fontWeight="normal">
                  Sálario: R$1.000,00-R$4.000,00 - Remoto
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
            <Text fontWeight="medium" fontSize="12">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>

            <HStack>
              {["User Interface Design", "User Experience Design"].map(
                (tag, key) => (
                  <Badge p="1" key={key}>
                    <Text fontWeight="normal" fontSize="12">
                      {tag}
                    </Text>
                  </Badge>
                )
              )}
            </HStack>
          </Stack>
        </>
      ) : (
        <h1>hello</h1>
      )}
    </Box>
  );
};

export default CardVacancies;
