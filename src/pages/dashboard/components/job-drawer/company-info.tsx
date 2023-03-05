import { JobModel } from "@/domain";
import { imgLoader } from "@/lib/image-loader";
import { AspectRatio, Heading, HStack, Skeleton, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { FiMapPin } from "react-icons/fi";

interface CompanyInfoProps {
    publishedAt: string;
    company: JobModel['company'];
    location: string;
}
export const CompanyInfo = ({
    publishedAt, company, location
}: CompanyInfoProps) => (
    <HStack flex={1}>
        <AspectRatio ratio={1}
            position="relative"
            overflow="hidden"
            rounded={"md"}
            w={28}
        >
            <Image
                alt={`Logo da empresa ${company?.description}`}
                src={company?.logo || ''}
                style={{ objectFit: "cover" }}
                loader={imgLoader}
                fill />
        </AspectRatio>

        <VStack align="stretch" flex={1}>
            <Heading size="lg">
                {company?.description || 'Empresa Confidencial'}
            </Heading>

            <Text size="sm" display={"inline-flex"} alignItems="center" gap={1}>
                <FiMapPin /> {location}
            </Text>

            <Text
                fontSize={"small"}
                display={"inline-flex"}
                alignItems="center"
                gap={1}
            >
                <>Publicada há {publishedAt}</>
            </Text>
        </VStack>
    </HStack>
);
