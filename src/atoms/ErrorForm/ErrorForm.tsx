import { Component, JSX } from 'solid-js';

interface ErrorFormProps
{
    class?: string;
    children: JSX.Element;
}

export const ErrorForm: Component<ErrorFormProps> = props => (
    <span
        class={props.class ? `${props.class} text-red-500 p-2` : 'text-red-500'}
    >
        {props.children}
    </span>
);

export default ErrorForm;
