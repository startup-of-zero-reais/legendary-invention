import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link as ChakraLink,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  ComponentWithAs,
  FlexProps,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/auth";
import ShowMe from "./show-me";
import { useRouter } from "next/router";
import { BsArrowRight, BsGithub, BsGoogle } from "react-icons/bs";
import { signIn } from "next-auth/react";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { whoAmi } = useAuth();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 0, md: 1 }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <Flex flex={1} justify={{ base: "center", md: "start" }}>
          <Image
            src="/logo.png"
            alt="Logo Job Talent Hub"
            width={35}
            height={35}
          />

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        {whoAmi ? (
          <ShowMe />
        ) : (
          <Stack
            justify={"flex-end"}
            direction={"row"}
            flexGrow={0}
            spacing={4}
            alignItems={"center"}
          >
            <Text
              display={{ base: "none", md: "inline-flex" }}
              alignItems={"center"}
              gap={2}
            >
                Acesso fácil <BsArrowRight />
            </Text>
            <Button
              display={{ base: "none", md: "inline-flex" }}
              onClick={() => signIn('google')}
              gap={2}
              color={'#4285F4'}
            >
              <BsGoogle size={22} />
            </Button>

            <Button
              display={{ base: "none", md: "inline-flex" }}
              onClick={() => signIn('github')}
              gap={2}
              color={'black'}
            >
              <BsGithub size={24} />
            </Button>
          </Stack>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const isActiveRoute = useActiveRoute();

  return (
    <Stack alignItems={"center"} direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <ChakraLink
                as={Link}
                p={2}
                position="relative"
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                _activeLink={{ color: "red" }}
                _after={
                  isActiveRoute(navItem.href)
                    ? {
                        content: '""',
                        borderBottomWidth: "2px",
                        borderBottomColor: "blue.100",
                        position: "absolute",
                        width: "100%",
                        left: 0,
                        bottom: "-12px",
                      }
                    : {}
                }
              >
                {navItem.label}
              </ChakraLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <ChakraLink
      as={Link}
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </ChakraLink>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  const isActiveRoute = useActiveRoute();

  const activeLinkStyle: FlexProps = isActiveRoute(href)
    ? {
        backgroundColor: "blue.50",
      }
    : {};

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        borderRadius={5}
        p={2}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
        {...activeLinkStyle}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <ChakraLink as={Link} key={child.label} py={2} href={child.href}>
                {child.label}
              </ChakraLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  activeOn?: string[];
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Procurar Vagas",
    href: "/",
    activeOn: ["/"]
  },
  {
    label: "Minhas Vagas",
    href: "/dashboard/minhas-vagas",
    activeOn: [
      '/dashboard/area-candidato',
      '/dashboard/area-recrutador',
    ]
  },
];

function useActiveRoute() {
  const router = useRouter();

  const isActiveRoute = (href?: string) => {
    const item = NAV_ITEMS.find(item => item.href === href)
    
    if (!item) return href === router.pathname;

    const { activeOn, href: itemHref } = item

    if (activeOn && activeOn.includes(router.pathname) && href == itemHref) {
      return true;
    }

    return href === router.pathname;
  };

  return isActiveRoute;
}
