import { Search2Icon } from "@chakra-ui/icons";
import { Flex, IconButton, Input, useColorModeValue } from "@chakra-ui/react";
import { useFilter } from "../Filter/context";
import { VscLoading } from "react-icons/vsc";
import React from "react";
import { motion } from "framer-motion";

const Search: React.FC = () => {
  const { updateSearch, isLoading } = useFilter();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      search: { value: string };
    };

    updateSearch(target.search.value);
  };

  const onSearchClear = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      updateSearch("");
    }
  };

  return (
    <Flex
      as={"form"}
      onSubmit={handleSubmit}
      bg="white"
      p={{ base: "2", lg: "4" }}
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius={{ base: "md", lg: "xl" }}
    >
      <Input
        onChange={onSearchClear}
        name="search"
        disabled={isLoading}
        placeholder="Procurar vagas por título, empresa ou palavra chave..."
      />
      {isLoading ? (
        <IconButton
          type="submit"
          aria-label="Procurador de vagas"
          icon={
            <motion.span
              animate={{ rotate: 180 }}
              transition={{ repeat: Infinity, duration: 0.2 }}
            >
              <VscLoading />
            </motion.span>
          }
          ml="2"
        />
      ) : (
        <IconButton
          type="submit"
          aria-label="Procurador de vagas"
          icon={<Search2Icon />}
          ml="2"
        />
      )}
    </Flex>
  );
};

export default Search;
