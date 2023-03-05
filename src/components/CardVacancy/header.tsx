import { Box, Button, Flex, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Stack, Text, useTheme } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import React, { useMemo } from "react";
import { imgLoader } from "@/lib/image-loader";
import { RenderIf } from "../helpers/render-if";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import Link from "next/link";

type Props = {
  id: string;
  logo: string;
  item: Variants;
  salary: string;
  workModel: string;
  title: string;
  createdAt: string;
  isApplied: boolean;
};

const Header: React.FC<Props> = ({
  id,
  item,
  logo,
  salary,
  workModel,
  title,
  createdAt,
  isApplied = false,
}) => {
  const { colors } = useTheme();

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
      width="full"
    >
      <Box
        width={20}
        height={20}
        position="relative"
        rounded={{base: "sm", md: "md"}}
        overflow="hidden"
        as={Link}
        scroll={false}
        href={`/?vaga=${id}`}
      >
        <Image
          src={logo}
          alt="Logo da empresa"
          loader={imgLoader}
          style={{ objectFit: "cover" }}
          fill
        />
      </Box>

      <Flex flexShrink={0} grow={1} flexDirection="column" ml={{ base: "4" }}>
        <Stack
          alignItems={{ lg: "center" }}
          direction={{ base: "column", lg: "row" }}
        >
          <Flex align={"center"} gap={2} justify="space-between" flex={1}>
            <Text
              fontWeight="medium"
              _after={{ lg: { content: `" •"` } }}
              as={Link}
              scroll={false}
              href={`/?vaga=${id}`}
            >
              {title}
            </Text>

            <RenderIf condition={isApplied}>
              <Popover isLazy trigger="hover">
                <PopoverTrigger>
                  <Button
                    p={2}
                    border="1px solid"
                    rounded="md"
                    borderColor={colors.green[200]}
                    variant={"ghost"}
                  >
                    <BsFillBookmarkCheckFill color={colors.green[500]} />
                  </Button>
                </PopoverTrigger>
                
                <Portal>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody bg={"white"}>
                      <Text fontSize={"sm"}>
                        Você já aplicou para esta vaga.
                        Fique tranquilo, em breve vai acontecer alguma coisa
                      </Text>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </RenderIf>
          </Flex>
          
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
          <Text color="gray.300" fontSize="12" fontWeight="normal"
            as={Link}
            scroll={false}
            href={`/?vaga=${id}`}
          >
            {`Salário ${salary} - ${workModel}`}
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;
