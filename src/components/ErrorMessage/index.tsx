import {
  ScaleFade,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import React from "react";
import { RenderIf } from "../helpers/render-if";

type Props = {
  error: string;
};

const ErrorMessage: React.FC<Props> = ({ error }) => {
  return (
    <RenderIf condition={!!error}>
      <ScaleFade in={!!error}>
        <Alert status="error" rounded={"md"} w="full" mb={2}>
          <AlertIcon />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </ScaleFade>
    </RenderIf>
  );
};

export default ErrorMessage;
