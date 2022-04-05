import { template, delegateEvents, insert, memo, addEventListener, spread, effect, setAttribute } from 'solid-js/web';
import { mergeProps, splitProps } from 'solid-js';
import './Input2.js';

const _tmpl$ = template(`<div><input></div>`, 3),
      _tmpl$2 = template(`<span class="input-addon prepend"></span>`, 2),
      _tmpl$3 = template(`<span class="input-addon append"></span>`, 2);
const handleClick = ({
  onClick
}) => event => {
  onClick(event);
};
const defaultProps = {
  onClick: () => {},
  onInput: () => {}
};
const Input = props => {
  props = mergeProps(defaultProps, props);
  const [local, restOfProps] = splitProps(props, ['onClick', 'containerClass']);
  return (() => {
    const _el$ = _tmpl$.cloneNode(true),
          _el$2 = _el$.firstChild;

    insert(_el$, (() => {
      const _c$ = memo(() => !!props.addon?.prepend, true);

      return () => _c$() && (() => {
        const _el$3 = _tmpl$2.cloneNode(true);

        addEventListener(_el$3, "click", handleClick({
          onClick: local.onClick
        }), true);

        insert(_el$3, () => props.addon.prepend);

        return _el$3;
      })();
    })(), _el$2);

    spread(_el$2, restOfProps, false, false);

    insert(_el$, (() => {
      const _c$2 = memo(() => !!props.addon?.append, true);

      return () => _c$2() && (() => {
        const _el$4 = _tmpl$3.cloneNode(true);

        addEventListener(_el$4, "click", handleClick({
          onClick: local.onClick
        }), true);

        insert(_el$4, () => props.addon.append);

        return _el$4;
      })();
    })(), null);

    effect(_p$ => {
      const _v$ = `input-addon-container${local.containerClass ? ` ${local.containerClass}` : ''}`,
            _v$2 = !!props.addon?.prepend,
            _v$3 = !!props.addon?.append,
            _v$4 = props.autocomplete ? props.autocomplete : 'on',
            _v$5 = props.type ?? 'text';

      _v$ !== _p$._v$ && (_el$.className = _p$._v$ = _v$);
      _v$2 !== _p$._v$2 && _el$2.classList.toggle("input-with-prepend", _p$._v$2 = _v$2);
      _v$3 !== _p$._v$3 && _el$2.classList.toggle("input-with-append", _p$._v$3 = _v$3);
      _v$4 !== _p$._v$4 && setAttribute(_el$2, "autocomplete", _p$._v$4 = _v$4);
      _v$5 !== _p$._v$5 && setAttribute(_el$2, "type", _p$._v$5 = _v$5);
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined
    });

    return _el$;
  })();
};

delegateEvents(["click"]);

export { Input, Input as default, handleClick };
