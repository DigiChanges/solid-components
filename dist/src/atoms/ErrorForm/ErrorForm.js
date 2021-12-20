import { template, insert, effect } from 'solid-js/web';

const _tmpl$ = template(`<span></span>`, 2);

const ErrorForm = props => (() => {
  const _el$ = _tmpl$.cloneNode(true);

  insert(_el$, () => props.children);

  effect(() => _el$.className = props.class ? `${props.class} text-red-500 p-2` : 'text-red-500');

  return _el$;
})();

export { ErrorForm, ErrorForm as default };
