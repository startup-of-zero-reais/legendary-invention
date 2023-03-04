import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";
import Footer from "./footer";
import Header from "./header";
import Body from "./body";
import { ApplyProvider, useApply } from "./context";
import { JobModel } from "@/domain";
import ErrorApply from "./error-apply";

const ModalApplyVacancy: React.FC = () => {
  const btnRef = React.useRef(null);

  const { isOpen, close } = useApply();

  return (
    <Drawer
      size={"lg"}
      isOpen={isOpen}
      placement="right"
      onClose={close}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton zIndex={10} />
        <Header />
        <Body />
        <ErrorApply />

        <Footer />
      </DrawerContent>
    </Drawer>
  );
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  job: JobModel;
};
const WrapperModalApply = ({ isOpen, onClose, job }: Props) => (
  <ApplyProvider job={job} onClose={onClose} isOpen={isOpen}>
    <ModalApplyVacancy />
  </ApplyProvider>
);

export default WrapperModalApply;
