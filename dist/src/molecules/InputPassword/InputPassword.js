import { createComponent, mergeProps } from 'solid-js/web';
import { splitProps, createSignal } from 'solid-js';
import { ErrorForm } from '../../atoms/ErrorForm/ErrorForm.js';
import { Icon } from '../../atoms/Icon/Icon.js';
import { IconEye } from '../../atoms/Icons/Stroke/IconEye.js';
import { IconEyeCrossed } from '../../atoms/Icons/Stroke/IconEyeCrossed.js';
import { Input } from '../../atoms/Input/Input.js';
import { Label } from '../../atoms/Label/Label.js';
import './InputPassword2.js';

const handleClick = ({
  onClick,
  isShowingPassword,
  setIsShowingPassword
}) => event => {
  setIsShowingPassword(!isShowingPassword);
  onClick(event);
};
const InputFormPassword = props => {
  const [local, restOfProps] = splitProps(props, ['onClick', 'labelName', 'labelClass', 'errorChildren']);
  const [getIsShowingPassword, setIsShowingPassword] = createSignal(false);
  return [createComponent(Label, {
    get ["for"]() {
      return props.id;
    },

    get ["class"]() {
      return local.labelClass;
    },

    get children() {
      return local.labelName;
    }

  }), createComponent(Input, mergeProps({
    get type() {
      return getIsShowingPassword() ? 'text' : 'password';
    },

    get addon() {
      return {
        append: getIsShowingPassword() ? createComponent(Icon, {
          render: IconEye
        }) : createComponent(Icon, {
          render: IconEyeCrossed
        })
      };
    },

    get onClick() {
      return handleClick({
        onClick: local.onClick,
        isShowingPassword: getIsShowingPassword(),
        setIsShowingPassword
      });
    }

  }, restOfProps)), createComponent(ErrorForm, {
    get children() {
      return local.errorChildren;
    }

  })];
};

export { InputFormPassword, InputFormPassword as default, handleClick };
