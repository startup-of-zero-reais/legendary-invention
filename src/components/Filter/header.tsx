import { ArrowUpIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, IconButton } from "@chakra-ui/react";
import React from "react";
import { useFilter } from "./context";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const { updateExpanded, isExpanded, updateClearAll } = useFilter();

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontWeight="semibold">Filtro</Text>

      <Flex justifyContent="center" alignItems="center">
        <Button size="xs" mr="2" onClick={() => updateClearAll(true)}>
          Limpar Tudo
          <SmallCloseIcon />
        </Button>

        <IconButton
          display={{ lg: "none" }}
          aria-label="Expandir e contrair filtros"
          icon={<ArrowUpIcon />}
          isRound
          as={motion.button}
          variants={{ expand: { rotate: 0 }, close: { rotate: 180 } }}
          animate={isExpanded ? "expand" : "close"}
          onClick={() => updateExpanded(!isExpanded)}
          size="sm"
        />
      </Flex>
    </Flex>
  );
};

export default Header;
