import CandidateForm from "@/presentation/pages/register/components/candidate-form";
import RecruiterForm from "@/presentation/pages/register/components/recruiter-form";
import {
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  useTheme,
} from "@chakra-ui/react";
import Image from "next/image";

export function Register() {
  const theme = useTheme();

  return (
    <Stack
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
      bg={theme.colors.gray[50]}
    >
      <Flex
        p={4}
        flex={1}
        align={"center"}
        justify={"center"}
        minW={`min(100%, ${theme.breakpoints.sm})`}
        direction={"column"}
      >
        <Stack
          spacing={4}
          padding={4}
          w={`min(100%, ${theme.breakpoints.sm})`}
          backgroundColor={`white`}
          rounded={8}
          shadow="md"
        >
          <Tabs isLazy isFitted variant={"enclosed"}>
            <TabList>
              <Tab>Sou Candidato</Tab>
              <Tab>Sou Recrutador</Tab>
            </TabList>

            <TabPanels>
              <CandidateForm />
              <RecruiterForm />
            </TabPanels>
          </Tabs>
        </Stack>
      </Flex>

      <Flex
        position="relative"
        flex={1}
        display={{ base: "none", md: "none", lg: "flex" }}
      >
        <Image
          alt={"Login Image"}
          style={{ objectFit: "cover" }}
          src="/login.png"
          fill
        />
      </Flex>
    </Stack>
  );
}
