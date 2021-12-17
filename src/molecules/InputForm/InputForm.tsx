import { Component, splitProps } from 'solid-js';
import ErrorForm from '../../atoms/ErrorForm/ErrorForm';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label/Label';
import InputFormProps from './Types';

export const handleClick = ( {
    onClick
} ) => ( event ) =>
{
    onClick( event );
};

export const InputForm: Component<InputFormProps> = ( props ) =>
{
    const [ local, restOfProps ] = splitProps( props, [ 'onClick' ] );

    return (
        <>
            <Label
                for={props.id}
                class={props.labelClass}
            >
                {props.labelName}
            </Label>
            <Input
                onClick={handleClick( {
                    onClick: props.onClick
                } )}
                onInput={props.onInput}
                {...restOfProps}
            />
            <ErrorForm>{props.errorChildren}</ErrorForm>
        </>
    );
};

export default InputForm;
