import n from '../../../external/rollup-plugin-styles/dist/runtime/inject-css.js';

var css = "\n.input-password-container {\n    display: inline;\n    position: relative;\n}\n\n.input-password {\n    background-color: transparent;\n    border: 1px solid transparent;\n    cursor: pointer;\n    position: absolute;\n    right: 5px;\n    min-width: 20px;\n    display: inline;\n}\n";
n(css,{});

export { css, css as default };
