import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";

// @Component Internal Applicaiton
import Location from "./location";
import Specialties from "./specialties";
import Availability from "./availability";
import Salary from "./salary";
import Header from "./header";
import Contracts from "./contracts";

import { useFilter } from "./context";

type Filter = {
  minSalary: number;
  maxSalary: number;
  specialties: string[];
  availabilities: string[];
  location: string;
  workModel: string;
};

function Filter() {
  const { isExpanded, filters } = useFilter();

  const variants: Variants = {
    open: { height: "auto", visibility: "visible", opacity: 1 },
    closed: { height: "0", visibility: "hidden", opacity: 0 },
  };

  return (
    <nav>
      <Box
        transition="200ms ease"
        width={{ base: "full", lg: "300px" }}
        bg="white"
        border="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        minHeight={{ lg: "780px", base: 0 }}
        flexShrink={0}
        flexGrow={0}
        p={{ base: 4, lg: 6 }}
        borderRadius={{ base: "md", lg: "2xl" }}
      >
        <Header />

        <Stack
          as={motion.div}
          initial={"closed"}
          style={{ backgroundColor: "white" }}
          animate={isExpanded ? "open" : "closed"}
          variants={variants}
          transition={{ type: "easeInOut" }}
          rowGap={4}
        >
          <Location />

          <Contracts contracts={filters.contracts.map((c) => c.name)} />

          <Specialties specialties={filters.techs.map((t) => t.name)} />

          <Availability
            availability={filters.availability.map((a) => a.name)}
          />

          <Salary />
        </Stack>
      </Box>
    </nav>
  );
}

export default Filter;
