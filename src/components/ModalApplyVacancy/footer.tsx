import { useAuth } from "@/context/auth";
import { Button, DrawerFooter } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { useApply } from "./context";

const Footer: React.FC = () => {
  const { actionApply, id } = useApply();
  const { isAuth } = useAuth();

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
    <DrawerFooter
      borderTopWidth="1px"
      as={motion.div}
      variants={item}
      initial={"hidden"}
      animate={"visible"}
    >
      {isAuth ? (
        <Button flex={1} colorScheme="blue" onClick={actionApply}>
          Aplicar para posição
        </Button>
      ) : (
        <Button
          flex={1}
          colorScheme="blue"
          as={Link}
          href={`/cadastro?vaga=${id}`}
        >
          Cadastre-se e aplique agora
        </Button>
      )}
    </DrawerFooter>
  );
};

export default Footer;
