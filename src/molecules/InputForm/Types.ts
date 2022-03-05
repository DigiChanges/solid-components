import { JSX } from 'solid-js';
import { BasicInputProps } from '../../atoms/Input/Types';

export type InputFormProps = {
    name: string;
    value: string;
    labelClass?: string;
    labelName?: string;
    errorChildren?: JSX.Element;
    errorClass?: string;
} & BasicInputProps

export default InputFormProps;
