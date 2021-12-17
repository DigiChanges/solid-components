import { JSX } from 'solid-js';

export type BasicInputProps = {
    id?: string;
    type?: string;
    placeholder?: string;
    autocomplete?: 'off' | 'on';
    useHandler?: any;
    addon?: {
        prepend?: JSX.Element;
        append?: JSX.Element;
    } ;
} & JSX.HTMLAttributes<HTMLInputElement>;

export default BasicInputProps;
