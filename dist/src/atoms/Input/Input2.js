import n from '../../../external/rollup-plugin-styles/dist/runtime/inject-css.js';

var css = "*, *:before, *:after {\n    margin: 0;\n    padding: 0;\n\n    -webkit-box-sizing: border-box !important;\n    -moz-box-sizing: border-box !important;\n    -ms-box-sizing: border-box !important;\n    box-sizing: border-box !important;\n}\n\n.input-addon-container {\n    display: flex;\n    position: relative;\n    align-items: center;\n}\n\n.input-addon {\n    background-color: transparent;\n    border: 1px solid transparent;\n    cursor: pointer;\n    position: absolute;\n    min-width: 20px;\n    display: inline;\n}\n\n.input-with-prepend {\n    width: 100%;\n    padding-left: 30px;\n}\n\n.input-with-append {\n    width: 100%;\n    padding-right: 30px;\n}\n\n.input-addon.prepend {\n    position: absolute;\n    left: 5px;\n    min-width: 20px;\n}\n\n.input-addon.append {\n    position: absolute;\n    right: 5px;\n    min-width: 20px;\n}\n";
n(css,{});

export { css, css as default };
