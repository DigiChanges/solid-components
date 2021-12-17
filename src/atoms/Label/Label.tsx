import { Component, JSX, splitProps } from 'solid-js';

interface LabelProps
{
    for?: string;
    class?: string;
    children?: JSX.Element;
    style?: { [key: string]: string };
}

export const Label: Component<LabelProps> = props => (
    <label
        for={props.for}
        class={props.class}
        style={props.style}
    >
        {props.children}
    </label>
);

export default Label;
