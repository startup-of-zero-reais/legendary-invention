import { HStack, Skeleton, VStack } from "@chakra-ui/react";

export const CompanyInfoSkeleton = () => (
        <HStack flex={1}>
            <Skeleton
                minW={28}
                minH={28}
                fadeDuration={0.3}
            />

            <VStack align="stretch" flex={1}>
                <Skeleton
                    minH={"26px"}
                    fadeDuration={0.3}
                />

                <Skeleton
                    minH={"24px"}
                    maxW={48}
                    fadeDuration={0.3}
                />

                <Skeleton
                    minH={"24px"}
                    maxW={48}
                    fadeDuration={0.3}
                />
            </VStack>
        </HStack>
    )