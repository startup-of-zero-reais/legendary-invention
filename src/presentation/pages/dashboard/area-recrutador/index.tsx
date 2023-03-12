import { Container, Heading } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const Header = dynamic(() => import('./components/header'))

const RecruiterArea = () => {
    return (
        <Suspense>
            <Container maxW="container.lg" bg="whiteAlpha.800">
                <Header />
            </Container>
        </Suspense>
    )
}

export default RecruiterArea