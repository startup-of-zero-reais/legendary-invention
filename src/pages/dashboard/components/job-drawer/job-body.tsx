import { JobModel } from "@/domain"
import { HStack, Tag, Text, useTheme, VStack } from "@chakra-ui/react";
import { FiDollarSign } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";

interface JobBodyProps {
    job: JobModel;
}

export const JobBody = ({ job }: JobBodyProps) => {
    const { colors } = useTheme()

    return (
        <VStack flex={1} w="full" gap={4}>
            <HStack
                flex={1}
                w="full"
                justify={"stretch"}
                gap={2}
                mt={4}
            >
                <HStack
                    border="1px solid"
                    borderColor={colors.gray[50]}
                    p={2}
                    flex={1}
                    rounded="md"
                    boxShadow={"sm"}
                >
                    <Text
                        fontSize={"xl"}
                        p={3}
                        bgColor={colors.gray[50]}
                        rounded="full"
                        boxShadow={"md"}
                    >
                        <FiDollarSign />
                    </Text>
                    <VStack flex={1} align="stretch">
                        <Text lineHeight={"4"} fontWeight="medium">{job.salary}</Text>
                        <Text lineHeight={"3"} fontSize="small">Salário</Text>
                    </VStack>
                </HStack>

                <HStack
                    border="1px solid"
                    borderColor={colors.gray[50]}
                    p={2}
                    flex={1}
                    rounded="md"
                    boxShadow={"sm"}
                >
                    <Text
                        fontSize={"xl"}
                        p={3}
                        bgColor={colors.gray[50]}
                        rounded="full"
                        boxShadow={"md"}
                    >
                        <IoBagOutline />
                    </Text>

                    <VStack flex={1} align="stretch">                        
                        <Text lineHeight={"4"} fontWeight="medium">{job.availability}</Text>
                        <Text lineHeight={"3"} fontSize="small">Modelo de trabalho</Text>
                    </VStack>
                </HStack>
            </HStack>

            <Text>{job.description}</Text>

            <HStack flex={1} w="full">
                {job.techs?.map((tech, i) => (
                    <Tag key={i}>
                        {tech}
                    </Tag>
                ))}
            </HStack>
        </VStack>
    )
}