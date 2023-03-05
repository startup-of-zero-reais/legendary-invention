import { HStack, Skeleton, SkeletonCircle, useTheme, VStack } from "@chakra-ui/react";

export const JobBodySkeleton = () => {
    const { colors } = useTheme();

    return (
        <VStack flex={1} w="full" gap={4}>
            <HStack
                flex={1}
                w="full"
                justify={"stretch"}
                gap={2}
                my={4}
            >
                <HStack
                    border="1px solid"
                    borderColor={colors.gray[50]}
                    p={2}
                    flex={1}
                    rounded="md"
                    boxShadow={"sm"}
                >
                    <SkeletonCircle
                        p={3}
                        boxShadow={"md"}
                    />

                    <VStack flex={1} align="stretch">
                        <Skeleton minH={"26px"} />
                        <Skeleton minH={"20px"} />
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
                    <SkeletonCircle
                        p={3}
                        boxShadow={"md"}
                    />

                    <VStack flex={1} align="stretch">
                        <Skeleton minH={"26px"} />
                        <Skeleton minH={"20px"} />
                    </VStack>
                </HStack>
            </HStack>
    
            <VStack w="full" flex={1} align="stretch">
                {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton minH={"20px"} key={i} />
                ))}
            </VStack>

            <HStack flex={1} w="full">
                {Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton minH={"22px"} minW={24} key={i} />
                ))}
            </HStack>
        </VStack>
    )
}