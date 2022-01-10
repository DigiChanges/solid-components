import { JSX } from 'solid-js';


export type BasicInputProps = {
    addon?: {
        prepend?: JSX.Element;
        append?: JSX.Element;
    } ;
} & JSX.InputHTMLAttributes<HTMLInputElement>;

export default BasicInputProps;
