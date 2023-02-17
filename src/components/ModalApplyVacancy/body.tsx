import { DrawerBody } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { Techs } from "@/components";
import About from "./about";
import { useApply } from "./context";
import WrapInfo from "./wrap-info";

const Body: React.FC = () => {
  const { techs } = useApply();

  const item = {
    hidden: {
      opacity: 0,
      y: "20%",
    },
    visible: {
      opacity: 1,
      y: "0",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <DrawerBody
      as={motion.div}
      variants={item}
      initial={"hidden"}
      animate={"visible"}
    >
      <WrapInfo />
      <About />
      <Techs techs={techs || []} />
    </DrawerBody>
  );
};

export default Body;
