import { JSX } from 'solid-js';
import { BasicInputProps } from '../../atoms/Input/Types';
export declare type InputFormProps = {
    name: string;
    value: string;
    labelClass?: string;
    labelName?: string | JSX.Element;
    hideError?: boolean;
    errorChildren?: JSX.Element;
    errorClass?: string;
} & BasicInputProps;
export default InputFormProps;
