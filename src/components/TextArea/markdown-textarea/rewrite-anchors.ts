import { Pluggable } from 'unified'
import rehypeRewrite from 'rehype-rewrite';

export function rewriteAnchor(): Pluggable {
    const removeLinks = (text: string) => {
        return text.replace(
            /((https?:\/+)?([a-zA-Z\d\.-]+))\.([a-zA-Z\.]{2,6})(\/\w\s+\.-)*([\/?\?\w+=\&])*/mg,
            'Não é permitido adicionar links'.toUpperCase(),
        )
    }

    const extractChildAsText = (children: Element): any => {
        let value = ''

        if (Array.isArray(children) && children.length > 0) {
            for (const childof of children) {
                if (childof.type === 'text' && childof.value) {                  
                    return [{
                        value: removeLinks(childof.value),
                        type: 'text'
                    }];
                }
    
                if (childof.type !== 'text') {
                    return childof
                }
            }
        }

        return [{
            type: 'text',
            value: removeLinks(value),
        }]
    }

    const rewrite = (node: any = {}) => {
        const children = extractChildAsText(node.children) // get only text value

        const newNode = {
            children,
            properties: {}, // remove any prop (ex: href, alt, src)
            tagName: 'span' // transform to span
        }

        return Object.assign(node, newNode) // apply to current node
    };

    return [
        rehypeRewrite,
        { selector: 'a', rewrite }
    ]
}