import { Stack, useColorModeValue } from "@chakra-ui/react";
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
      p={3}
      justifyContent={"center"}
      borderRadius={"md"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      flexShrink={0}
    >
      <Image
        src={src}
        alt="Logo da empresa"
        width={40}
        height={40}
        loader={({ src }) => src}
      />
    </Stack>
  );
};

export default LogoCompany;
