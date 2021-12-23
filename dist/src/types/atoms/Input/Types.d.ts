import { JSX } from 'solid-js';
export declare type BasicInputProps = {
    useHandler?: (element: HTMLElement, accesor?: () => any) => void;
    addon?: {
        prepend?: JSX.Element;
        append?: JSX.Element;
    };
} & JSX.InputHTMLAttributes<HTMLInputElement>;
export default BasicInputProps;
