import { Company, JobModel } from "@/domain";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";

interface WithChildrenProps {
  children: React.ReactNode;
}

interface ApplyProviderProps extends WithChildrenProps {
  job: JobModel;
  onClose: () => void;
  isOpen: boolean;
}

interface ApplyProviderContext {
  id: string;
  title: string;
  description: string;
  salary: string;
  hourDistance: string;
  techs?: string[];
  workModel: string;
  company?: Company;
  actionApply: () => void;
  close: () => void;
  isOpen: boolean;
}

const ApplyContext = React.createContext<ApplyProviderContext>(
  {} as ApplyProviderContext
);

export function ApplyProvider({
  children,
  job,
  isOpen,
  onClose,
}: ApplyProviderProps) {
  const router = useRouter();

  const {
    description,
    id,
    salary,
    title,
    workModel = "Home Office",
    techs,
    createdAt,
    company,
  } = job;

  const dateFormated = useMemo(
    () =>
      formatDistance(new Date(createdAt), new Date(), {
        addSuffix: true,
        locale: pt,
      }),
    [createdAt]
  );

  const close = useCallback(() => {
    router.push("/");
    onClose();
  }, [onClose, router]);

  const actionApply = useCallback(() => {
    close();
  }, [close]);

  return (
    <ApplyContext.Provider
      value={{
        actionApply,
        hourDistance: dateFormated,
        description,
        id,
        company,
        salary,
        title,
        workModel,
        techs,
        isOpen,
        close,
      }}
    >
      {children}
    </ApplyContext.Provider>
  );
}

export function useApply() {
  return React.useContext(ApplyContext);
}
