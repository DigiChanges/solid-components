import { JSX, splitProps, Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';
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

type IconComponentProps = {
    size?: number;
    render?: RenderIconComponent;
    class?: string;
    skeleton?: boolean;
    style?: { [key: string]: string } | string;
} & JSX.HTMLAttributes<HTMLDivElement> & DefaultIconProps;

export const Icon: Component<IconComponentProps> = ( props ) =>
{
    if ( props.skeleton === true )
    {
        const [ local, restProps ] = splitProps( props, [ 'size', 'style', 'class' ] );
        return (
            <div
                class="bx--icon--skeleton"
                // eslint-disable-next-line solid/style-prop
                style={`${local.style}; width: ${local.size || 16}px; height: ${local.size || 16}px;`}
                {...restProps}
            >
            </div>
        );
    }
    else
    {
        const [ local, restProps ] = splitProps( props, [ 'render' ] );
        return (
            <Dynamic component={local.render} {...restProps} />
        );
    }
};

export default Icon;
