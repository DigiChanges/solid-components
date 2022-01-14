import n from '../../../external/rollup-plugin-styles/dist/runtime/inject-css.js';

var css = ".bx--icon--skeleton {\n    position: relative;\n    padding: 0;\n    background: var(--cds-skeleton-01, #e5e5e5);\n    border: none;\n    box-shadow: none;\n    pointer-events: none;\n    display: inline-block;\n    width: 1rem;\n    height: 1rem\n}\n";
n(css,{});

export { css, css as default };
