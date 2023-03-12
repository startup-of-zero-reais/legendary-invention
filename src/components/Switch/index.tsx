import {
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Switch as ChakraSwitch,
    SwitchProps as ChakraSwitchProps
} from '@chakra-ui/react'
import { Path, UseFormRegister } from 'react-hook-form';

type FV = { [k: string]: any };

interface SwitchProps<FormValues extends FV> extends ChakraSwitchProps {
    name: Path<FormValues>
    label: string;
    register: UseFormRegister<FormValues>;
    isInvalid?: boolean;
    errorMessage?: string;
    helperMessages?: string[];
}

function Switch<FormValues extends FV>(props: SwitchProps<FormValues>) {
    const {
        name,
        label,
        register,
        isInvalid = false,
        errorMessage = "",
        helperMessages = [],
        justifyContent = 'flex-start',
        ...rest
    } = props;

    return (
        <FormControl
            display='flex'
            flexDirection={"column"}
            alignItems='stretch'
            justifyContent={"flex-end"}
            py={2}
        >
            <HStack
                justifyContent={justifyContent}
            >
                <FormLabel htmlFor={name} mb='0'>
                    {label}
                </FormLabel>

                <ChakraSwitch
                    id={name}
                    {...rest}
                    {...register(name)}
                    isInvalid={isInvalid}
                />
            </HStack>

            <FormHelperText
                w="full"
                display={"flex"}
                flexDirection="column"
                alignItems={justifyContent}
            >
                {helperMessages.map((text, i) => (
                    <small key={i}>{text}</small>
                ))}
            </FormHelperText>
        </FormControl>
    )
}

export default Switch;