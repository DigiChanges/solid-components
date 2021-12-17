import { Component } from 'solid-js';

type IconComponentProps = {
    height?: number;
    width?: number;
    class?: string;
} ;

export const Picture:  Component<IconComponentProps> = ( props ) =>
{
    return (
        <picture
            class={props.class}
        >
            <img src={props.class} style={{ 'height': props.height, 'max-width': props.width }} />
        </picture>
    );
};

export default Picture;
