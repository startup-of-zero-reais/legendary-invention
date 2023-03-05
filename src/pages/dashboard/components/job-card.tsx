import { LoadAppliedJobs } from "@/domain";
import { imgLoader } from "@/lib/image-loader";
import { Box, Button, Flex, Heading, HStack, SlideFade, Text, useTheme, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface JobCardProps {
    job: LoadAppliedJobs.JobModel;
    index: number;
}

const JobCard = ({ job, index }: JobCardProps) => {
    const { colors } = useTheme()
    const { id, title, company } = job;

    const animation = {
      hidden: {
        opacity: 0,
        y: "20%",
      },
      visible: {
        opacity: 1,
        y: "0",
        transition: {
          duration: 0.2,
          delay: index * 0.1,
        },
      },
    };

    return (
        <Flex
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={animation}
            flex={1}
            p={2}
            boxShadow="md"
            rounded="md"
            border="1px solid"
            borderColor={"gray.100"}
            bgImg={`linear-gradient(0,
                ${colors.gray[50]}80,
                ${colors.gray[50]}60
            )`}
        >
            <HStack flex={1}>
                <Box
                    position="relative"
                    width={28}
                    height={28}
                    flexShrink={0}
                    overflow="hidden"
                    rounded="md"
                >
                    <Image
                        alt={`Logo da empresa ${company.description}`}
                        src={company.logo}
                        loader={imgLoader}
                        style={{ objectFit: "cover" }}
                        fill
                    />
                </Box>

                <VStack align={"stretch"} flex={1}>
                    <Heading size="md">{title}</Heading>

                    <Text flex={1}>{company.description}</Text>
                    
                    <HStack align={"baseline"}>
                        <Button
                            as={Link}
                            href={`?vaga=${id}`}
                            size="sm"
                            variant={"outline"}
                            color={"blue.400"}
                            borderColor={"blue.400"}
                            scroll={false}
                        >
                            Ver vaga
                        </Button>
                    </HStack>
                </VStack>
            </HStack>
        </Flex>
    )
}

export default JobCard;