import { createComponent, mergeProps, memo } from 'solid-js/web';
import { splitProps } from 'solid-js';
import { ErrorForm } from '../../atoms/ErrorForm/ErrorForm.js';
import { Input } from '../../atoms/Input/Input.js';
import { Label } from '../../atoms/Label/Label.js';

const handleClick = ({
  onClick
}) => event => {
  onClick(event);
};
const InputForm = props => {
  const [local, restOfProps] = splitProps(props, ['onClick', 'labelName', 'labelClass', 'errorClass', 'errorChildren', 'hideError']);
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
    get onClick() {
      return handleClick({
        onClick: local.onClick
      });
    }

  }, restOfProps)), memo((() => {
    const _c$ = memo(() => !!!local.hideError, true);

    return () => _c$() && createComponent(ErrorForm, {
      get ["class"]() {
        return local.errorClass;
      },

      get children() {
        return local.errorChildren;
      }

    });
  })())];
};

export { InputForm, InputForm as default, handleClick };
