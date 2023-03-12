import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import Code from "./mermaid-support";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, ScaleFade } from "@chakra-ui/react";
import { ReactNode, useCallback, useState } from "react";
import { rewriteAnchor } from "./rewrite-anchors";
import { toolbar } from "./toolbar";
import { Control, Controller, useController } from "react-hook-form";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

interface MarkdownTextAreaProps {
    name: string;
    label: string;
    control: Control<any>;
    errorMessage?: string;
    isInvalid?: boolean;
}

const defaultJobDescription = `Insira uma breve descrição da sua vaga

### Atividades da vaga

Será responsável por fazer determinada atividade

### Requisitos necessários / desejáveis

- Desejável conhecimento em testes unitários
- Necessário inglês básico

### Horário

De segunda à sexta das 09h00 às 18h00 com 1 hora de almoço

### Benefícios

- Vale transporte
- Exemplo

### Informações adicionais

Você gostaria de acrescentar algo a mais sobre a vaga ?
`

export const MarkdownTextArea = ({
    name,
    label,
    control,
    errorMessage: errMessage = '',
    isInvalid: invalid = false,
}: MarkdownTextAreaProps) => {
    const [value, setValue] = useState(defaultJobDescription)

    const isInvalid = invalid || value == defaultJobDescription;
    const errorMessage = errMessage || 'A descrição é obrigatória';
    
    const [preview, setPreview] = useState<'edit' | 'preview'>('edit')

    if (typeof window !== 'undefined') {
        const editor = document?.querySelector('.wmde-markdown-var') as HTMLElement
        if (editor && isInvalid)    
            editor.style.setProperty('--color-border-default', '#FB3C4E')
        else if (editor && !isInvalid)
            editor.style.setProperty('--color-border-default', '#d0d7de')
    }

    const togglePreview = useCallback(() => {
        setPreview(preview === 'edit' ? 'preview' : 'edit')
    }, [preview])

    return (
        <Flex w="full" alignItems={"stretch"} flexDir="column" gap={2}>
            <FormControl isInvalid={isInvalid}>
                <FormLabel htmlFor={name}>{label}</FormLabel>

                <Controller
                    render={({ field }) => (
                        <>
                            <MDEditor
                                id={name}
                                data-color-mode="light"
                                height={400}
                                maxHeight={800}
                                preview={preview}
                                value={value}
                                commands={toolbar()}
                                extraCommands={[]}
                                previewOptions={{
                                    components: Code as any,
                                    rehypePlugins: [
                                        [rehypeSanitize],
                                        rewriteAnchor(),
                                    ]
                                }}
                                textareaProps={field}
                                onChange={(value) => setValue(value || '')}
                            />
                        </>
                    )}
                    name={name}
                    control={control}
                />

                <Flex w={"full"} justifyContent="space-between" mt={2}>
                    <ScaleFade in={isInvalid}>
                        <FormErrorMessage>
                            {errorMessage}
                        </FormErrorMessage>
                    </ScaleFade>

                    <Button
                        onClick={togglePreview}
                        colorScheme="linkedin"
                        variant="outline"
                    >
                        {preview === 'edit' ? 'Visualizar' : 'Editar'}
                    </Button>
                </Flex>
            </FormControl>
        </Flex>
    )
}