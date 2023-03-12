import { ICommand } from "@uiw/react-md-editor";

export function toolbar(): ICommand[] {
    return [
        boldtext(),
        heading(),
        italic(),
        bulletedList(),
        orderedList(),
    ]
}

function boldtext(): ICommand {
    return {
        name: 'bold',
        keyCommand: 'bold',
        buttonProps: { 'aria-label': 'Destacar', title: 'Destacar' },
        icon: (
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.061 11.22A4.46 4.46 0 0 0 18 8.5C18 6.019 15.981 4 13.5 4H6v15h8c2.481 0 4.5-2.019 4.5-4.5a4.48 4.48 0 0 0-1.439-3.28zM13.5 7c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5H9V7h4.5zm.5 9H9v-3h5c.827 0 1.5.673 1.5 1.5S14.827 16 14 16z"></path>
            </svg>
        ),
        execute: (state, api) => {
            let modifyText = `**${state.selectedText}**`;
            if (!state.selectedText) {
                modifyText = `****`;
            }

            api.replaceSelection(modifyText)
            api.setSelectionRange({
                start: state.selection.start+2,
                end: state.selection.end+2,
            })
        }
    }
}

function heading(): ICommand {
    return {
        name: 'title',
        keyCommand: 'title',
        buttonProps: { 'aria-label': 'Adicionar título', title: 'Adicionar título' },
        icon: (
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20V4h-3v6H9V4H6v16h3v-7h6v7z"></path>
            </svg>
        ),
        execute: (state, api) => {
            let modifyText = `### ${state.selectedText}\n`
            if (!state.selectedText) {
                modifyText = `### `;
            }

            api.replaceSelection(modifyText)
        },
    }
}

function italic(): ICommand {
    return {
        name: 'italic',
        keyCommand: 'italic',
        buttonProps: { 'aria-label': 'Deixar em itálico', title: 'Deixar em itálico' },
        icon: (
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 7V4H9v3h2.868L9.012 17H5v3h10v-3h-2.868l2.856-10z"></path>
            </svg>
        ),
        execute: (state, api) => {
            let modifyText = `*${state.selectedText}*`
            if (!state.selectedText) {
                modifyText = `**`;
            }

            api.replaceSelection(modifyText)
            api.setSelectionRange({
                start: state.selection.start+1,
                end: state.selection.end+1,
            })
        },
    }
}

function bulletedList(): ICommand {
    return {
        name: 'bullet',
        keyCommand: 'bullet',
        buttonProps: { 'aria-label': 'Adicionar item', title: 'Adicionar item' },
        icon: (
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 12 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2 13c0 .59 0 1-.59 1H.59C0 14 0 13.59 0 13c0-.59 0-1 .59-1h.81c.59 0 .59.41.59 1H2zm2.59-9h6.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1H4.59C4 2 4 2.41 4 3c0 .59 0 1 .59 1zM1.41 7H.59C0 7 0 7.41 0 8c0 .59 0 1 .59 1h.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1h.01zm0-5H.59C0 2 0 2.41 0 3c0 .59 0 1 .59 1h.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1h.01zm10 5H4.59C4 7 4 7.41 4 8c0 .59 0 1 .59 1h6.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1h.01zm0 5H4.59C4 12 4 12.41 4 13c0 .59 0 1 .59 1h6.81c.59 0 .59-.41.59-1 0-.59 0-1-.59-1h.01z"></path>
            </svg>
        ),
        execute: (state, api) => {
            let modifyText = `- ${state.selectedText}`
            if (!state.selectedText) {
                modifyText = `- `;
            }

            api.replaceSelection(modifyText)
        },
    }
}

function orderedList(): ICommand {
    return {
        name: 'bullet',
        keyCommand: 'bullet',
        buttonProps: { 'aria-label': 'Adicionar item', title: 'Adicionar item' },
        icon: (
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 13 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.01 13c0 .59 0 1-.59 1H4.6c-.59 0-.59-.41-.59-1 0-.59 0-1 .59-1h6.81c.59 0 .59.41.59 1h.01zM4.6 4h6.81C12 4 12 3.59 12 3c0-.59 0-1-.59-1H4.6c-.59 0-.59.41-.59 1 0 .59 0 1 .59 1zm6.81 3H4.6c-.59 0-.59.41-.59 1 0 .59 0 1 .59 1h6.81C12 9 12 8.59 12 8c0-.59 0-1-.59-1zm-9.4-6h-.72c-.3.19-.58.25-1.03.34V2h.75v2.14H.17V5h2.84v-.86h-1V1zm.392 8.12c-.129 0-.592.04-.802.07.53-.56 1.14-1.25 1.14-1.89C2.72 6.52 2.18 6 1.38 6c-.59 0-.97.2-1.38.64l.58.58c.19-.19.38-.38.64-.38.28 0 .48.16.48.52 0 .53-.77 1.2-1.7 2.06V10h3v-.88h-.598zm-.222 3.79v-.03c.44-.19.64-.47.64-.86 0-.7-.56-1.11-1.44-1.11-.48 0-.89.19-1.28.52l.55.64c.25-.2.44-.31.69-.31.27 0 .42.13.42.36 0 .27-.2.44-.86.44v.75c.83 0 .98.17.98.47 0 .25-.23.38-.58.38-.28 0-.56-.14-.81-.38l-.48.66c.3.36.77.56 1.41.56.83 0 1.53-.41 1.53-1.16 0-.5-.31-.81-.77-.94v.01z"></path></svg>
        ),
        execute: (state, api) => {
            let counter = 1;

            const textUntilCursor = state.text.substring(0, state.selection.start)

            const lastCounterText = textUntilCursor
                .replace(/([^\d\s+\.]+)/g, '')
                .trim()
                .split(/[\s\n]+/)
                .flatMap(text => text.match(/[\d+\.]/))
                .at(-1)

            if (lastCounterText && !isNaN(+lastCounterText)) {
                counter = +lastCounterText + 1
            }            

            let modifyText = `\n${counter}. ${state.selectedText}`
            if (!state.selectedText) {
                modifyText = `\n${counter}. `;
            }

            api.replaceSelection(modifyText)
        },
    }
}