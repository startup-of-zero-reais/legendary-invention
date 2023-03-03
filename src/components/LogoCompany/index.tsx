import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type Props = {
  src: string;
};

const LogoCompany: React.FC<Props> = ({ src }) => {
  return (
    <Stack
      bg={"white"}
      border="1px"
      p={{ base: 1, md: 2 }}
      justifyContent={"center"}
      borderRadius={"md"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      flexShrink={0}
    >
      <Box
        w={{ base: 14, md: 24}}
        h={{ base: 14, md: 24}}
        rounded={{ base: "sm", md: "md" }}
        position="relative"
        overflow="hidden"
      >
        <Image
          src={src}
          alt="Logo da empresa"
          style={{ objectFit: "cover" }}
          loader={({ src }) => src}
          fill
        />
      </Box>
    </Stack>
  );
};

export default LogoCompany;
