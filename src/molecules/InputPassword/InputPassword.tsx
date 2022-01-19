import { Component, createSignal, mergeProps, splitProps } from 'solid-js';
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

const defaultProps = {
    onClick: () =>
    {}
};

export const InputFormPassword: Component<InputFormProps> = ( props ) =>
{
    props = mergeProps( defaultProps, props );
    const [ local, restOfProps ] = splitProps( props, [ 'onClick', 'labelName', 'labelClass', 'errorClass', 'errorChildren' ] );
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
            <ErrorForm
                class={local.errorClass}
            >
                {local.errorChildren}
            </ErrorForm>
        </>
    );
};

export default InputFormPassword;
