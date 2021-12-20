import { createComponent, mergeProps } from 'solid-js/web';
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
  const [local, restOfProps] = splitProps(props, ['onClick']);
  return [createComponent(Label, {
    get ["for"]() {
      return props.id;
    },

    get ["class"]() {
      return props.labelClass;
    },

    get children() {
      return props.labelName;
    }

  }), createComponent(Input, mergeProps({
    get onClick() {
      return handleClick({
        onClick: props.onClick
      });
    },

    get onInput() {
      return props.onInput;
    }

  }, restOfProps)), createComponent(ErrorForm, {
    get children() {
      return props.errorChildren;
    }

  })];
};

export { InputForm, InputForm as default, handleClick };
