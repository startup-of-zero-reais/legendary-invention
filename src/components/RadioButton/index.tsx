import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    RadioProps,
    ScaleFade,
    Stack,
} from '@chakra-ui/react'
import { Path, UseFormRegister } from 'react-hook-form';
import { RenderIf } from '../helpers/render-if';

type FV = { [k: string]: any };

type Option = {
    label: string;
    value: string;
    isDisabled?: boolean;
}

interface RadioButtonProps<FormValues extends FV> extends RadioProps {
    name: Path<FormValues>
    label?: string;
    register: UseFormRegister<FormValues>;
    options: Option[] | (() => Option[]);
    onRight?: boolean;
    errorMessage?: string;
    helperMessages?: string[];
}

function RadioButton<FormValues extends FV>(props: RadioButtonProps<FormValues>) {
    const {
        name,
        label = '',
        register,
        options = [],
        onRight = false,
        isInvalid = false,
        errorMessage = '',
        helperMessages = [],
        ...rest
    } = props;

    const radioOptions = Array.isArray(options)
        ? options
        : typeof options === 'function'
            ? options()
            : [];

    return (
        <FormControl isInvalid={isInvalid}>
            <RadioGroup
                w="full"
                display={"flex"}
                alignItems={onRight ? 'flex-end' : "flex-start"}
                flexDir={'column'}
            >
                <RenderIf condition={Boolean(label)}>
                    <FormControl w="full">
                        <FormLabel
                            textAlign={onRight ? 'right' : "left"}
                            ml={onRight ? 4 : 0}
                            mr={!onRight ? 4 : 0}
                        >
                            {label}
                        </FormLabel>
                    </FormControl>
                </RenderIf>

                <Stack
                    flexDir={'row'}
                    alignItems={"center"}
                    gap={2}
                >
                    {radioOptions.map((option, i) => (
                        <Radio
                            key={i}
                            {...rest}
                            value={option.value}
                            isDisabled={!!option.isDisabled}
                            m={`0 !important`}
                            {...register(name)}
                            isInvalid={isInvalid}
                        >
                            {option.label}
                        </Radio>
                    ))}
                </Stack>
            </RadioGroup>

            <FormHelperText
                textAlign={onRight ? 'right' : "left"}
                display={'flex'} flexDir="column"
            >
                {helperMessages.map((helper, i) => (
                    <span key={i}>{helper}</span>
                ))}
            </FormHelperText>

            <ScaleFade in={isInvalid}>
                <FormErrorMessage
                    justifyContent={onRight ? 'flex-end' : "flex-start"}
                    w="full"
                    flex={1}
                >
                        {errorMessage}
                </FormErrorMessage>
            </ScaleFade>
        </FormControl>
    )
}

export default RadioButton