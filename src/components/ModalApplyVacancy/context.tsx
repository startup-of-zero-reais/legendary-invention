import { Company, JobModel } from "@/domain";
import { useErrorWithTimeout } from "@/lib/set-error-with-timeout";
import { bff } from "@/server-lib/services";
import { AxiosError } from "axios";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";

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
  location: string;
  error: string;
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

  const [error, setError] = useState("");

  const setErrorWithTimeout = useErrorWithTimeout(setError);

  const {
    description,
    id,
    salary,
    title,
    workModel = "Home Office",
    techs,
    createdAt,
    company,
    location = "Não encontrada",
  } = job;

  const dateFormated = useMemo(
    () =>
      formatDistance(new Date(createdAt), new Date(), {
        addSuffix: true,
        locale: ptBR,
      }),
    [createdAt]
  );

  const close = useCallback(() => {
    router.push("/", undefined, { scroll: false });
    onClose();
  }, [onClose, router]);

  const actionApply = useCallback(async () => {
    try {
      await bff.post("/api/apply", {
        jobId: id,
      });
      close();
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorWithTimeout(error.response?.data.message);
        return;
      }
      setErrorWithTimeout("Ocorreu um erro, tente novamente mais tarde");
    }
  }, [close, id, setErrorWithTimeout]);

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
        error,
        location,
      }}
    >
      {children}
    </ApplyContext.Provider>
  );
}

export function useApply() {
  return React.useContext(ApplyContext);
}
