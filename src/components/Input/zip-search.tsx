import { useDebounce } from "@/lib/debounce";
import { searchLocation } from "@/server-lib/api/locations";
import {
    HStack,
    Input as ChakraInput,
    InputGroup,
    InputLeftAddon,
    Spinner,
    InputRightElement,
    IconButton,
    Tag,
    TagCloseButton,
    TagLabel,
    InputProps,
    FormControl,
    ScaleFade,
    FormErrorMessage,
    FormLabel
} from "@chakra-ui/react";
import { useState, useCallback, useEffect, useRef } from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { BsFillPinAngleFill } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { RenderIf } from "../helpers/render-if";

type FV = { [k: string]: any };

interface ZipSearchProps<FormValues extends FV> extends InputProps {
    name: Path<FormValues>;
    label: string;
    register: UseFormRegister<FormValues>;
    errorMessage?: string;
    isInvalid?: boolean;
}

function ZipSearch<FormValues extends FV>({
    name,
    label,
    register,
    errorMessage = '',
    isInvalid = false,
    ...rest
}: ZipSearchProps<FormValues>) {
    const labelRef = useRef<HTMLLabelElement>(null)
    const [zip, setZip] = useState('')
    const [city, setCity] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const clearZip = useCallback(() => {
        setCity(null)
        setZip('')
        labelRef.current?.focus()
    }, [])

    const search = useDebounce(async (_zip: string) => {
        try {
            if (_zip) {
                setIsLoading(true)
                const result = await searchLocation(_zip)
                setCity(result)
            }
        } finally {
            setIsLoading(false)
        }
    }, 500)

    useEffect(() => search(zip), [zip, search])
    
    return (
        <FormControl w="full" isInvalid={isInvalid}>
            <FormLabel ref={labelRef}>
                {label}
            </FormLabel>

            <HStack w="full">
                <InputGroup flex={1}>
                    <InputLeftAddon color={"cyan.500"}>
                        <RenderIf condition={isLoading}>
                            <Spinner size={"sm"} />
                        </RenderIf>

                        <RenderIf condition={!isLoading}>
                            <BsFillPinAngleFill />
                        </RenderIf>
                    </InputLeftAddon>

                    <ChakraInput
                        placeholder="CEP: 00000-000"
                        {...rest}
                        {...register(name, {
                            onChange: e => setZip(e.target.value),
                            setValueAs: () => city,
                        })}
                        value={zip}
                    />

                    <InputRightElement>
                        <IconButton
                            aria-label="limpar cep"
                            icon={<FiX />}
                            onClick={clearZip}
                        />
                    </InputRightElement>
                </InputGroup>

                <Tag
                    flex={1}
                    minW={"fit-content"}
                    size="lg"
                    colorScheme={city ? "cyan" : "gray"}
                    gap={2}
                >
                    <RenderIf condition={Boolean(city)}>
                        <TagCloseButton onClick={clearZip} />
                    </RenderIf>

                    <TagLabel flex={1}>
                        <RenderIf condition={Boolean(city)}>
                            {city}
                        </RenderIf>

                        <RenderIf condition={!Boolean(city)}>
                            Faça uma busca por cep
                        </RenderIf>
                    </TagLabel>
                </Tag>
            </HStack>

            <RenderIf condition={isInvalid}>
                <ScaleFade in={isInvalid}>
                    <FormErrorMessage>
                        {errorMessage}
                    </FormErrorMessage>
                </ScaleFade>
            </RenderIf>
        </FormControl>
    )
}

export default ZipSearch;