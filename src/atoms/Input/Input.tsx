import { Component, mergeProps, splitProps } from 'solid-js';
import './Input.css';
import { BasicInputProps } from './Types';

export const handleClick = ( { onClick } ) => ( event ) =>
{
    onClick( event );
};

const defaultProps = {
    onClick: () =>
    {},
    onInput: () =>
    {}
};

export const Input: Component<BasicInputProps> = ( props ) =>
{
    props = mergeProps( defaultProps, props );
    const [ local, restOfProps ] = splitProps( props, [ 'onClick' ] );

    return (
        <div class="input-addon-container">
            { props.addon?.prepend &&
                <span
                    class='input-addon prepend'
                    onClick={handleClick( {
                        onClick: local.onClick
                    } )}
                >
                    {props.addon.prepend }
                </span>
            }
            <input
                classList={( {
                    'input-with-prepend': !!props.addon?.prepend,
                    'input-with-append': !!props.addon?.append
                } )}
                autocomplete={props.autocomplete ? props.autocomplete : 'on'}
                type={props.type ?? 'text'}
                {...restOfProps}
            />
            { props.addon?.append &&
                <span
                    class='input-addon append'
                    onClick={handleClick( {
                        onClick: local.onClick
                    } )}
                >
                    {props.addon.append }
                </span>
            }
        </div>
    );
};

export default Input;
