import { JSX } from 'solid-js';
export declare type BasicInputProps = {
    containerClass?: string;
    addon?: {
        prepend?: JSX.Element;
        append?: JSX.Element;
    };
} & JSX.InputHTMLAttributes<HTMLInputElement>;
export default BasicInputProps;
