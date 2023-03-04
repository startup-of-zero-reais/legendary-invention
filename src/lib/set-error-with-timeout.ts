import { useCallback, useRef } from "react";

type Props = {
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export function useErrorWithTimeout(
  setError: React.Dispatch<React.SetStateAction<string>>,
  seconds: number = 5
) {
  const timeout = useRef<NodeJS.Timeout>(null!);
  const setErrorWithTimeout = useCallback(
    (msg: string) => {
      if (timeout.current) clearTimeout(timeout.current);

      setError(msg);
      // clear error
      timeout.current = setTimeout(() => {
        setError("");
        clearTimeout(timeout.current);
      }, seconds * 1000);
    },
    [seconds, setError]
  );

  return setErrorWithTimeout;
}
