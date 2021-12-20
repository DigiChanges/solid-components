import { JSX } from 'solid-js';
export declare type BasicInputProps = {
    id?: string;
    type?: string;
    placeholder?: string;
    autocomplete?: 'off' | 'on';
    useHandler?: (element: HTMLElement, accesor?: () => any) => void;
    addon?: {
        prepend?: JSX.Element;
        append?: JSX.Element;
    };
} & JSX.HTMLAttributes<HTMLInputElement>;
export default BasicInputProps;
