import { Component } from 'solid-js';
import InputFormProps from '../InputForm/Types';
import './InputFormPassword.css';
export declare const handleClick: ({ onClick, isShowingPassword, setIsShowingPassword }: {
    onClick: any;
    isShowingPassword: any;
    setIsShowingPassword: any;
}) => (event: any) => void;
export declare const InputFormPassword: Component<InputFormProps>;
export default InputFormPassword;
