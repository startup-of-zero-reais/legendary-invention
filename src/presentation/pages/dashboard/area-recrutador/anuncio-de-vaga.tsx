import { Button, Container, Divider, HStack, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components";
import { MarkdownTextArea } from "@/components/TextArea/markdown-textarea";
import { FiSave } from "react-icons/fi";
import Switch from "@/components/Switch";

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

const NewJobAd = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm<JobFormInputs>()

    const onSubmit = useCallback((data: JobFormInputs) => {}, [])
    
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
                />

                <HStack
                    w="full"
                    alignItems={"flex-end"}
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
                        helperMessages={[
                            'Ao esconder o salário aparecerá "A combinar"',
                            'Os candidatos demonstram menos interesse em vagas com salário oculto'
                        ]}
                    />
                </HStack>

                <Divider pt={4} mb={`4 !important`} />

                <Button leftIcon={<FiSave />} >Enviar vaga</Button>
            </VStack>
        </Container>
    )
}

export default NewJobAd