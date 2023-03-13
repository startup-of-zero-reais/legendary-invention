import { RenderIf } from "@/components/helpers/render-if";
import { useDebounce } from "@/lib/debounce";
import {
    Box,
    Button,
    Card,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as ChakraInput,
    InputProps as ChakraInputProps,
    ScaleFade,
    Stack,
    Tag,
    TagCloseButton,
    TagLabel,
    ThemeTypings,
    VStack
} from "@chakra-ui/react"
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";

type FV = { [k: string]: any };

export interface Option {
    label: string;
    value: string;
}

interface MultiSelectTextProps<FormValues extends FV> extends ChakraInputProps {
    name: Path<FormValues>;
    register: UseFormRegister<FormValues>;
    label: string;
    options?: Option[] | ((input: string) => Promise<Option[]>);
    errorMessage?: string;
    isInvalid?: boolean;
    tagColorScheme?: ThemeTypings["colorSchemes"];
}

function MultiSelectText<FormValues extends FV>({
    name,
    label,
    register,
    options = [],
    errorMessage = '',
    isInvalid = false,
    tagColorScheme = 'blue',
    ...rest
}: MultiSelectTextProps<FormValues>) {
    const [activeSuggestion, setActiveSuggestion] = useState(0)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState("")
    const [filteredSuggestions, setFilteredSuggestions] = useState<Option[]>([])
    const [selected, setSelected] = useState<Option[]>([])
    let inputRef = useRef<HTMLLabelElement>(null)

    let loadedOptions = useRef<Option[]>([]);

    let debouncedLoad = useDebounce(
        () => {
            if (loadedOptions.current.length > 0) {
                return
            }

            if (typeof options === 'function') {
                options(userInput).then(results => loadedOptions.current = results)

                return;
            }
            
            loadedOptions.current = options;
        }
    );

    useEffect(() => debouncedLoad(), [debouncedLoad])

    const selectOption = useCallback((option: Option) => {
        setActiveSuggestion(0)
        setShowSuggestions(false)
        
        if (option)
            setSelected(old => [...old, option])

        setUserInput('')
        inputRef.current?.focus()
    }, [])

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const input = (e.currentTarget?.value ?? e.target?.value ?? '')
            .replace(/[^\w\d\s]+$/i, '')

        if (!input) {
            setShowSuggestions(false)
            setFilteredSuggestions([])
            return;
        }

        let filtered: Option[] = []
        if (input && loadedOptions.current.length > 0) {
            filtered = loadedOptions.current
                .filter(option => option.label.toLowerCase().includes(input.toLowerCase()))
                .filter(option => !selected.find(s => s.value === option.value))

            setFilteredSuggestions(filtered)
        }

        setUserInput(input)
        setShowSuggestions(true)
    }, [selected]);

    const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const input = e.currentTarget?.innerText || ''

        console.log(input)
            
        const option = filteredSuggestions
            .find(suggestion => suggestion.label.toLowerCase() === input.toLowerCase()) ??
        loadedOptions.current
                .find(suggestion => suggestion.label.toLowerCase() === input.toLowerCase())

        console.log(option)

        if (option)
            selectOption(option)
    }, [filteredSuggestions, selectOption])

    const onKeyDown = useCallback((e: React.KeyboardEvent) => {
        const acceptedKeys = ['Enter', 'ArrowUp', 'ArrowDown']

        if (e.ctrlKey && e.key === "Backspace") setUserInput('')
        if (e.key === "Backspace" && userInput.length === 1) setUserInput('')

        if (!acceptedKeys.includes(e.key)) return;

        if (e.key === 'Enter') {
            e.preventDefault();

            const alreadySelected = selected
                .find(s => s.value === filteredSuggestions[activeSuggestion]?.value)

            if (!alreadySelected)
                selectOption(filteredSuggestions[activeSuggestion])

            return;
        }

        if (e.key === "ArrowUp") {
            if (activeSuggestion === 0) 
                return

            setActiveSuggestion((old) => old - 1)
        }
        
        if (e.key === "ArrowDown") {
            if (activeSuggestion - 1 === filteredSuggestions.length)
                return

            setActiveSuggestion((old) => old + 1)
        }
    }, [userInput.length, selected, selectOption, filteredSuggestions, activeSuggestion])

    const onClose = useDebounce((e: any) => setShowSuggestions(false), 300)

    const registered = register(name, {
        onChange,
        onBlur: onClose,
        setValueAs: () => selected.length == 0 ? null : selected,
    })

    const removeOption = useCallback((value: Option['value']) => {
        return (e: React.MouseEvent) => {
            inputRef.current?.focus()
            
            setSelected([
                ...selected.filter(opt => opt.value !== value),
            ]);

            setUserInput('');
        }
    }, [selected])

    const mapOptions = (function() {
        if (filteredSuggestions.length > 0 && !!userInput) {
            return filteredSuggestions
        }

        if (!!userInput && filteredSuggestions.length == 0) {
            return [{ value: "", label: 'Nenhuma opção encontrada' }]
        }

        if (selected.length > 0) {
            return loadedOptions.current
                .filter(option => !selected.find(s => s.value === option.value))
        }

        if (loadedOptions.current.length === 0) {
            return [{ value: "", label: 'Nenhuma opção' }]
        }

        return loadedOptions.current
    })()

    return (
        <VStack align={"stretch"} w="full">
            <FormControl isInvalid={isInvalid}>
                <Box position="relative">
                    <FormLabel
                        htmlFor={name}
                        ref={inputRef}
                    >
                        {label}
                    </FormLabel>

                    <ChakraInput
                        id={name}
                        onClick={() => setShowSuggestions(true)}
                        onKeyDown={onKeyDown}
                        autoComplete="off"
                        {...rest}
                        {...registered}
                        value={userInput}
                    />

                    <RenderIf condition={showSuggestions}>
                        <ScaleFade in={showSuggestions}>
                            <Card
                                size={"sm"}
                                position="absolute"
                                insetX={0}
                                top={"100%"}
                                mt={2}
                                bgColor="white"
                                zIndex={10}
                                gap={2}
                                py={2}
                            >
                                    {mapOptions.map(({ label, value }, key) => (
                                        <Button
                                            size="sm"
                                            variant={"ghost"}
                                            justifyContent="flex-start"
                                            colorScheme={"gray"}
                                            tabIndex={key}
                                            py={1}
                                            px={4}
                                            value={value}
                                            key={key}
                                            _hover={{ bgColor: "gray.50" }}
                                            bgColor={key === activeSuggestion ? "gray.50" : undefined}
                                            onClick={onClick}
                                            isDisabled={!value}
                                            fontWeight="normal"
                                        >
                                            {label}
                                        </Button>
                                    ))}
                            </Card>
                        </ScaleFade>
                    </RenderIf>
                </Box>

                <Stack flexDir='row' my={2} gap={2}>
                    {selected.map(({ label, value }, i) => (
                        <Tag
                            key={i}
                            rounded="full"
                            colorScheme={tagColorScheme}
                            m={`0 !important`}
                        >
                            <TagLabel>{label}</TagLabel>
                            <TagCloseButton
                                onClick={removeOption(value)}
                            />
                        </Tag>
                    ))}
                </Stack>

                <ScaleFade in={isInvalid}>
                    <FormErrorMessage>{errorMessage}</FormErrorMessage>
                </ScaleFade>
            </FormControl>
        </VStack>

                        
    )
}

export default MultiSelectText

