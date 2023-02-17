import React from "react";
import LogoCompany from "../LogoCompany";
import { DrawerHeader, HStack, Stack, Text } from "@chakra-ui/react";
import { HiLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import { useApply } from "./context";

const Header: React.FC = () => {
  const { company, title, hourDistance } = useApply();

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
      },
    },
  };

  return (
    <DrawerHeader display={"flex"}>
      <LogoCompany
        src={
          company?.logo ||
          "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        }
      />
      <Stack
        as={motion.div}
        variants={item}
        initial={"hidden"}
        animate={"visible"}
        mx={4}
        flexGrow={0}
      >
        <Text>{title}</Text>
        <HStack>
          <HiLocationMarker color={"gray"} />

          <Text color={"gray.300"} fontSize={12} fontWeight={"medium"}>
            {`${company?.location || "Goiânia"} - ${hourDistance}`}
          </Text>
        </HStack>
      </Stack>
    </DrawerHeader>
  );
};

export default Header;
