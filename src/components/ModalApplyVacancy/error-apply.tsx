import React from "react";
import ErrorMessage from "../ErrorMessage";
import { useApply } from "./context";

const ErrorApply: React.FC = () => {
  const { error } = useApply();

  return <ErrorMessage error={error} />;
};

export default ErrorApply;
