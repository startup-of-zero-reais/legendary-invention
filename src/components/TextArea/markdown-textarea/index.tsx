import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import Code from "./mermaid-support";
import { Button, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { ReactNode, useCallback, useState } from "react";
import { rewriteAnchor } from "./rewrite-anchors";
import { toolbar } from "./toolbar";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

interface MarkdownTextAreaProps {
    name: string;
    label: string;
    onChange?: (event: any) => void;
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
    onChange,
}: MarkdownTextAreaProps) => {
    const [value, setValue] = useState(defaultJobDescription)
    
    const [preview, setPreview] = useState<'edit' | 'preview'>('edit')

    const togglePreview = useCallback(() => {
        setPreview(preview === 'edit' ? 'preview' : 'edit')
    }, [preview])

    const internOnChange = useCallback((value: any, event: any) => {
        onChange?.(event)
        setValue(value ?? '');
    }, [onChange])

    return (
        <Flex w="full" alignItems={"stretch"} flexDir="column" gap={2}>
            <FormControl mt={2}>
                <FormLabel htmlFor={name}>{label}</FormLabel>
            </FormControl>

            <MDEditor
                id={name}
                data-color-mode="light"
                height={400}
                maxHeight={800}
                preview={preview}
                onChange={internOnChange}
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
            />

            <Flex w={"full"} justifyContent="flex-end">
                <Button
                    onClick={togglePreview}
                    colorScheme="linkedin"
                    variant="outline"
                >
                    {preview === 'edit' ? 'Visualizar' : 'Editar'}
                </Button>
            </Flex>
        </Flex>
    )
}