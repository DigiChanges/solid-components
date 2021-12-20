import { template, insert, effect, setAttribute, style } from 'solid-js/web';

const _tmpl$ = template(`<label></label>`, 2);

const Label = props => (() => {
  const _el$ = _tmpl$.cloneNode(true);

  insert(_el$, () => props.children);

  effect(_p$ => {
    const _v$ = props.for,
          _v$2 = props.class,
          _v$3 = props.style;
    _v$ !== _p$._v$ && setAttribute(_el$, "for", _p$._v$ = _v$);
    _v$2 !== _p$._v$2 && (_el$.className = _p$._v$2 = _v$2);
    _p$._v$3 = style(_el$, _v$3, _p$._v$3);
    return _p$;
  }, {
    _v$: undefined,
    _v$2: undefined,
    _v$3: undefined
  });

  return _el$;
})();

export { Label, Label as default };
