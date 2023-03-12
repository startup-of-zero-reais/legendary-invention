import { Button, Container, Divider, HStack, VStack } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { FiSave } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Input } from "@/components";
import { MarkdownTextArea } from "@/components/TextArea/markdown-textarea";
import Switch from "@/components/Switch";
import RadioButton from "@/components/RadioButton";

interface JobFormInputs {
    title: string;
    description: string;
    salary: string;
    hideSalary: boolean;
    contracts: string[];
    techs: string[];
    availability: string;
    location: string;
}

const resolver = yupResolver(
    yup.object().shape({
        title: yup.string().required('O cargo é obrigatório'),
        description: yup.string().required('A descrição é obrigatória'),
        salary: yup.string().required('Você deve informar o salário para a vaga'),
        hideSalary: yup.boolean(),
        availability: yup.string().required('Selecione a disponibilidade desejada para a vaga'),
        contracts: yup.array(),
        techs: yup.array(),
        location: yup.string(),
    }),
)

const NewJobAd = () => {    
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<JobFormInputs>({
        resolver,
    })

    const onSubmit = useCallback((data: JobFormInputs) => {
        alert(JSON.stringify(data))
    }, [])

    useEffect(() => {
        if (errors)
            console.log(errors)
    }, [errors])
    
    return (
        <Container
            maxW={"container.lg"}
            bgColor="whiteAlpha.900"
            py={4}
        >
            <VStack
                as={"form"}
                onSubmit={handleSubmit(onSubmit)}
                gap={4}
            >
                <Input<JobFormInputs>
                    name="title"
                    label="Cargo"
                    register={register}
                    placeholder="Ex: Desenvolvedor backend"
                    errorMessage={errors?.title?.message}
                    isInvalid={!!errors?.title?.message}
                />

                <MarkdownTextArea
                    label="Descrição da vaga"
                    {...register('description')}
                    control={control}
                    errorMessage={errors?.description?.message}
                    isInvalid={!!errors?.description?.message}
                />

                <HStack
                    w="full"
                    alignItems={"flex-end"}
                    flexDir={{ base: 'column', md: 'row'}}
                    gap={2}
                >
                    <Input<JobFormInputs>
                        name="salary"
                        label="Salário"
                        register={register}
                        placeholder="Ex: 7.500"
                        type={"number"}
                        errorMessage={errors?.salary?.message}
                        isInvalid={!!errors?.salary?.message}
                        isCurrency
                    />

                    <Switch<JobFormInputs>
                        name="hideSalary"
                        label="Esconder salário"
                        register={register}
                        justifyContent={'flex-end'}
                        errorMessage={errors?.hideSalary?.message}
                        isInvalid={!!errors?.hideSalary?.message}
                        helperMessages={[
                            'Ao esconder o salário aparecerá "A combinar"',
                            'Os candidatos demonstram menos interesse em vagas com salário oculto'
                        ]}
                    />
                </HStack>

                <RadioButton<JobFormInputs>
                    name="availability"
                    label="Disponibilidade"
                    register={register}
                    options={[
                      { label: 'Home Office', value: 'Home Office' },
                      { label: 'Presencial', value: 'Presencial' },
                      { label: 'Híbrido', value: 'Híbrido' },
                    ]}
                    errorMessage={errors?.availability?.message}
                    isInvalid={!!errors?.availability?.message}
                    onRight
                />

                <Divider pt={4} mb={`4 !important`} />

                <Button leftIcon={<FiSave />} type="submit">Enviar vaga</Button>
            </VStack>
        </Container>
    )
}

export default NewJobAd