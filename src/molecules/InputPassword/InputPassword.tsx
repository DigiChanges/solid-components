import { Component, createSignal, splitProps } from 'solid-js';
import { InputFormProps } from '../..';
import ErrorForm from '../../atoms/ErrorForm/ErrorForm';
import Icon from '../../atoms/Icon';
import IconEye from '../../atoms/Icons/Stroke/IconEye';
import IconEyeCrossed from '../../atoms/Icons/Stroke/IconEyeCrossed';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label/Label';
import './InputPassword.css';

export const handleClick = ( {
    onClick,
    isShowingPassword,
    setIsShowingPassword
} ) => ( event ) =>
{
    setIsShowingPassword( !isShowingPassword );
    onClick( event );
};

export const InputFormPassword: Component<InputFormProps> = ( props ) =>
{
    const [ local, restOfProps ] = splitProps( props, [ 'onClick', 'labelName', 'labelClass', 'errorChildren' ] );
    const [ getIsShowingPassword, setIsShowingPassword ] = createSignal( false );

    return (
        <>
            <Label
                for={props.id}
                class={local.labelClass}
            >
                {local.labelName}
            </Label>
            <Input
                type={getIsShowingPassword() ? 'text' : 'password'}
                addon={{
                    append: getIsShowingPassword()
                        ? <Icon  render={IconEye} />
                        : <Icon  render={IconEyeCrossed} />
                }}
                onClick={handleClick( {
                    onClick: local.onClick,
                    isShowingPassword: getIsShowingPassword(),
                    setIsShowingPassword
                } )}
                {...restOfProps}
            />
            <ErrorForm>{local.errorChildren}</ErrorForm>
        </>
    );
};

export default InputFormPassword;
