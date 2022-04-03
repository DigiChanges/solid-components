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
    const [ local, restOfProps ] = splitProps( props, [ 'onClick', 'labelName', 'labelClass', 'errorClass', 'errorChildren', 'hideError' ] );

    return (
        <>
            <Label
                for={props.id}
                class={local.labelClass}
            >
                {local.labelName}
            </Label>
            <Input
                onClick={handleClick( {
                    onClick: local.onClick
                } )}
                {...restOfProps}
            />
            {!local.hideError && <ErrorForm class={local.errorClass}>{local.errorChildren}</ErrorForm>}
        </>
    );
};

export default InputForm;
