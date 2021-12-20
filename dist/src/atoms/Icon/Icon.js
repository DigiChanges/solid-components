import { template, spread, effect, style, createComponent, Dynamic, mergeProps } from 'solid-js/web';
import { splitProps } from 'solid-js';
import './Icon2.js';

const _tmpl$ = template(`<div class="bx--icon--skeleton"></div>`, 2);
const Icon = props => {
  if (props.skeleton === true) {
    const [local, restProps] = splitProps(props, ['size', 'style', 'class']);
    return (() => {
      const _el$ = _tmpl$.cloneNode(true);

      spread(_el$, restProps, false, true);

      effect(_$p => style(_el$, `${local.style}; width: ${local.size || 16}px; height: ${local.size || 16}px;`, _$p));

      return _el$;
    })();
  } else {
    const [local, restProps] = splitProps(props, ['render']);
    return createComponent(Dynamic, mergeProps({
      get component() {
        return local.render;
      }

    }, restProps));
  }
};

export { Icon, Icon as default };
