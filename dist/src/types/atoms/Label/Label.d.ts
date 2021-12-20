import { Component, JSX } from 'solid-js';
interface LabelProps {
    for?: string;
    class?: string;
    children?: JSX.Element;
    style?: {
        [key: string]: string;
    };
}
export declare const Label: Component<LabelProps>;
export default Label;
