import { JSX, Component } from 'solid-js';
import './Icon.css';
export declare interface DefaultIconProps {
    id?: string;
    class?: string;
    tabindex?: string;
    focusable?: boolean;
    title?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    style?: string;
    fill?: string;
    stroke?: string;
    width?: string;
    height?: string;
    onClick?: MouseEvent;
    onMouseOver?: MouseEvent;
    onMouseEnter?: MouseEvent;
    onMouseLeave?: MouseEvent;
    onKeyUp?: KeyboardEvent;
    onKeyDown?: KeyboardEvent;
}
export declare type RenderIconComponent = Component<DefaultIconProps>;
declare type IconComponentProps = {
    size?: number;
    render?: RenderIconComponent;
    class?: string;
    skeleton?: boolean;
    style?: {
        [key: string]: string;
    } | string;
} & JSX.HTMLAttributes<HTMLDivElement> & DefaultIconProps;
export declare const Icon: Component<IconComponentProps>;
export default Icon;
