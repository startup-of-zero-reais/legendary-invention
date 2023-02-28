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
import { LoadFilters } from "@/domain/usecases/load-filters";

type Filter = {
  minSalary: number;
  maxSalary: number;
  specialties: string[];
  availabilities: string[];
  location: string;
  workModel: string;
};

function Filter() {
  const { isExpanded, namedFilters } = useFilter();

  let _embedded: LoadFilters.Embedded["_embedded"] = {
    techs: [],
    contracts: [],
    availability: [],
  };

  if (namedFilters) {
    _embedded = namedFilters._embedded;
  }

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
        >
          <Location />

          <Contracts contracts={_embedded.contracts.map((c) => c.name)} />

          <Specialties specialties={_embedded.techs.map((t) => t.name)} />

          <Availability
            availability={_embedded.availability.map((a) => a.name)}
          />

          <Salary />
        </Stack>
      </Box>
    </nav>
  );
}

export default Filter;
