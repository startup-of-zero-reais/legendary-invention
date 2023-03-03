import React, { ReactElement } from "react";
import { Box, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CgWorkAlt } from "react-icons/cg";
import { HiCurrencyDollar } from "react-icons/hi";
import { useApply } from "./context";

const WrapInfo: React.FC = () => {
  const { salary, workModel } = useApply();

  const items = [
    {
      description: "Salário",
      value: salary,
      icon: <HiCurrencyDollar size={22} color={"gray"} />,
    },
    {
      description: "Modelo de Trabalho",
      value: workModel,
      icon: <CgWorkAlt size={22} color={"gray"} />,
    },
  ];
  return (
    <Flex gap={2} flexDir={"row"}>
      {items.map((item, key) => (
        <BoxInfo
          key={key}
          index={key}
          icon={item.icon}
          label={item.value}
          description={item.description}
        />
      ))}
    </Flex>
  );
};

type BoxInfoProps = {
  icon: ReactElement;
  label: string;
  description: string;
  index: number;
};

const BoxInfo = ({ icon: Icon, label, description, index }: BoxInfoProps) => {
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
    <Stack
      as={motion.div}
      variants={item}
      initial={"hidden"}
      animate={"visible"}
      bg={"white"}
      border="1px"
      p={{ base: 2, lg: 4 }}
      borderRadius={"md"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      flexDir={"row"}
      alignItems={"center"}
      gap={{ base: 2, md: 4 }}
      flex={1}
      height={{ base: 'auto', md: `min(100px, auto)` }}
    >
      <Box
        border="1px"
        borderRadius="full"
        p={2}
        bg={"gray.50"}
        borderColor={"gray.50"}
      >
        {Icon}
      </Box>
      
      <Box style={{ margin: 0 }}>
        <Text fontWeight={"bold"}>{label}</Text>
        <Text fontSize={12} fontWeight={"normal"} color={"gray.500"}>
          {description}
        </Text>
      </Box>
    </Stack>
  );
};

export default WrapInfo;
