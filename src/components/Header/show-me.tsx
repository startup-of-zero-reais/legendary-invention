import { useAuth } from "@/context/auth";
import {
  Avatar,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";

const ShowMe: React.FC = () => {
  const { activeProfile, canSwap, profile, swapProfile, logout } = useAuth();

  const hasProfile = profile();

  if (!hasProfile) return null;

  const translatePortuguese = {
    candidate: "recrutador",
    recruiter: "candidato",
    unknown: "desconhecido",
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar
          size={"sm"}
          src={
            hasProfile.image ||
            "https://avatars.dicebear.com/api/male/username.svg"
          }
        />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <Center>
          <Avatar
            size={"2xl"}
            src={
              hasProfile.image ||
              "https://avatars.dicebear.com/api/male/username.svg"
            }
          />
        </Center>
        <Center>
          <p>{hasProfile.name}</p>
        </Center>
        <br />
        <MenuDivider />
        {canSwap ? (
          <MenuItem onClick={swapProfile}>
            Trocar para {translatePortuguese[activeProfile]}
          </MenuItem>
        ) : null}
        <MenuItem onClick={logout}>Sair da conta</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ShowMe;
