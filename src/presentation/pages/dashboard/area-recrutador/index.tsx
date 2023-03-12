import { Container, Heading } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const Header = dynamic(() => import('./components/header'))

const RecruiterArea = () => {
    return (
        <Suspense>
            <Container maxW="container.lg" bg="whiteAlpha.800" minH={"100vh"}>
                <Header />

                <Heading mt={4}>Tá bom assim professor ?</Heading>

            </Container>
        </Suspense>
    )
}

export default RecruiterArea