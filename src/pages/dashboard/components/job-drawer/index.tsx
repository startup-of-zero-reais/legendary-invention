import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Skeleton,
    Spinner,
    Text,
    VStack
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { LoadJob } from "@/domain";
import { getJob } from "@/server-lib/api/jobs";
import { CompanyInfo } from "./company-info";
import { CompanyInfoSkeleton } from "./company-info-skeleton";
import { JobBodySkeleton } from "./job-body-skeleton";
import { JobBody } from "./job-body";
import { Nullable } from "@/lib/nullable";

interface JobDrawerProps {
    jobID?: string;
    isOpen: boolean;
    onClose: () => void;
}

const JobDrawer = ({
    jobID = '',
    isOpen,
    onClose,
}: JobDrawerProps) => {
    const { data: job, isSuccess } = useQuery<Nullable<LoadJob.Model>>(
        ['@loadSingleJob', jobID],
        async () => getJob(jobID),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }
    )

    const formattedDate = useMemo(() => {
        if (!job?.createdAt)
            return ''

        return formatDistance(new Date(job.createdAt), new Date(), {
            addSuffix: true,
            locale: ptBR,
        })
    }, [job?.createdAt])

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement="right"
            size={"lg"}
        >
            <DrawerOverlay />

            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth={1}>
                    <Skeleton
                        minH={"26px"}
                        mr={4}
                        isLoaded={isSuccess}
                        fadeDuration={0.2}
                    >
                        <Text>{job?.title}</Text>
                    </Skeleton>
                </DrawerHeader>

                <DrawerBody>
                    <VStack flex={1} align="stretch">
                        {!job
                            ? <CompanyInfoSkeleton />
                            : (
                                <CompanyInfo
                                    publishedAt={formattedDate}
                                    company={job.company}
                                    location={job.location}
                                />
                            )
                        }

                        {!job
                            ? <JobBodySkeleton />
                            : <JobBody job={job} />
                        }
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default JobDrawer