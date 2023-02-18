import { useDebounce } from "@/utils/debounce";
import { Search2Icon } from "@chakra-ui/icons";
import { Flex, IconButton, Input, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type Props = {
  onSearch: (value: string) => void;
};

const Search: React.FC<Props> = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const debounce = useDebounce(onSearch, 2000);

  useEffect(() => {
    debounce(search);
  }, [debounce, search]);

  return (
    <Flex
      bg="white"
      p={{ base: "2", md: "4", lg: "6" }}
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius={{ base: "md", lg: "2xl" }}
    >
      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Procurar vagas por título, empresa ou qualquer palavra chave..."
      />
      <IconButton
        aria-label="Procurador de vagas"
        icon={<Search2Icon />}
        ml="2"
      />
    </Flex>
  );
};

export default Search;
