import { ImageLoaderProps } from "next/image";

export function imgLoader(props: ImageLoaderProps): string {
    const { src, width, quality } = props;
    const params = new URLSearchParams({
        url: src,
        w: Math.min(width, 1080).toString(),
        q: `${quality || 75}`,
    });
    
    return `${src}?${params}`
}