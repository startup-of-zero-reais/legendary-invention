import { Button, Container, Divider, HStack, VStack } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { FiSave } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Input, MultiSelectText } from "@/components";
import { TextAreaWithMarkdown } from "@/components";
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
        contracts: yup.array()
            .min(1, 'Você deve selecionar pelo menos 1 regime')
            .max(2, 'Você pode selecionar até 2 regimes')
            .required('Selecione ao menos 1 regime de contratação'),
        techs: yup.array()
            .min(1, 'Você deve selecionar pelo menos 1 tecnologia')
            .max(5, 'Você pode selecionar até 5 tecnologias')
            .required('Selecione ao menos 1 tecnologia para a vaga'),
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
        console.log(JSON.stringify(data))
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

                <TextAreaWithMarkdown
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

                <MultiSelectText<JobFormInputs>
                    name="contracts"
                    label="Regime de contratação"
                    register={register}
                    placeholder="Ex: CLT, PJ"
                    options={() => Promise.resolve(options)}
                    errorMessage={errors?.contracts?.message}
                    isInvalid={!!errors?.contracts?.message}
                />

                <MultiSelectText<JobFormInputs>
                    name="techs"
                    label="Tecnologias"
                    register={register}
                    placeholder="Ex: Javascript, PHP"
                    options={() => Promise.resolve(options)}
                    errorMessage={errors?.techs?.message}
                    isInvalid={!!errors?.techs?.message}
                    tagColorScheme="purple"
                />

                <Divider pt={4} mb={`4 !important`} />

                <Button leftIcon={<FiSave />} type="submit">Enviar vaga</Button>
            </VStack>
        </Container>
    )
}

export default NewJobAd

const options = Array.from({ length: 10 })
    .map((_, i) => ({
        label: `Option ${i+1}`,
        value: `${i+1}`,
    }))