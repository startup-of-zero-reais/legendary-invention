import { Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import React, { useMemo } from "react";

type Props = {
  logo: string;
  item: Variants;
  salary: string;
  workModel: string;
  title: string;
  createdAt: string;
};

const Header: React.FC<Props> = ({
  item,
  logo,
  salary,
  workModel,
  title,
  createdAt,
}) => {
  const dateFormated = useMemo(
    () =>
      formatDistance(new Date(createdAt), new Date(), {
        addSuffix: true,
        locale: pt,
      }),
    [createdAt]
  );
  return (
    <Flex
      as={motion.div}
      variants={item}
      initial={"hidden"}
      animate={"visible"}
    >
      <Image
        src={logo}
        alt="Logo da empresa"
        width={60}
        height={40}
        loader={({ src }) => src}
        style={{ objectFit: "cover" }}
      />
      <Flex flexShrink={0} flexDirection="column" ml={{ base: "4" }}>
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
            {`Salário: ${salary} - ${workModel}`}
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;
