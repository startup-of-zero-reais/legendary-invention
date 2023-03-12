import { HStack, Link as ChakraLink } from "@chakra-ui/react"
import { TbTargetArrow } from 'react-icons/tb'
import Link from 'next/link'

const Header = () => {
    return (
        <HStack w="full">
            <ChakraLink
                href="/dashboard/area-recrutador/anuncio-de-vaga"
                as={Link}
                display="inline-flex"
                alignItems="center"
                gap={2}
                p={2}
                color="red.500"
            >
                <TbTargetArrow size={24} /> Anuncie uma vaga grátis
            </ChakraLink>
        </HStack>
    )
}

export default Header;