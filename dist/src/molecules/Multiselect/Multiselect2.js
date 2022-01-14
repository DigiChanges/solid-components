import n from '../../../external/rollup-plugin-styles/dist/runtime/inject-css.js';

var css = "/* *, ::after, ::before {\n    box-sizing: border-box;\n} */\n\n.multiSelectContainer {\n    position: relative;\n    text-align: left;\n    width: 100%;\n}\n\n.disable_ms {\n    pointer-events: none;\n    opacity: 0.5;\n}\n\n.searchWrapper {\n    border: 1px solid #cccccc;\n    border-radius: 4px;\n    padding: 5px;\n    min-height: 22px;\n    position: relative;\n}\n\n.multiSelectContainer input {\n    border: none;\n    margin-top: 3px;\n    background: transparent;\n}\n\n.multiSelectContainer input:focus {\n    outline: none;\n}\n\n.chip {\n    padding: 4px 10px;\n    background: #0096fb;\n    margin-right: 5px;\n    margin-bottom: 5px;\n    border-radius: 11px;\n    display: inline-flex;\n    align-items: center;\n    font-size: 13px;\n    line-height: 19px;\n    color: #fff;\n    white-space: nowrap;\n}\n\n.singleChip {\n    background: none;\n    border-radius: none;\n    color: inherit;\n    white-space: nowrap;\n}\n\n.singleChip i, .singleChip img {\n    display: none;\n}\n\n.closeIcon {\n    height: 13px;\n    width: 13px;\n    float: right;\n    margin-left: 5px;\n    cursor: pointer;\n}\n\n.optionListContainer {\n    position: absolute;\n    width: 100%;\n    background: #fff;\n    border-radius: 4px;\n    margin-top: 1px;\n    z-index: 2;\n}\n\n.multiSelectContainer ul {\n    display: block;\n    padding: 0;\n    margin: 0;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    max-height: 250px;\n    overflow-y: auto;\n}\n\n.multiSelectContainer li {\n    padding: 10px 10px;\n}\n\n.multiSelectContainer li:hover {\n    background: #0096fb;\n    color: #fff;\n    cursor: pointer;\n}\n\n.checkbox {\n    margin-right: 10px;\n}\n\n.disableSelection {\n    pointer-events: none;\n    opacity: 0.5;\n}\n\n.highlightOption {\n    background: #0096fb;\n    color: #ffffff;\n}\n\n.displayBlock {\n    display: block;\n}\n\n.displayNone {\n    display: none;\n}\n\n.notFound {\n    padding: 10px;\n    display: block;\n}\n\n.singleSelect {\n    padding-right: 20px;\n}\n\nli.groupHeading {\n    color: #908e8e;\n    pointer-events: none;\n    padding: 5px 15px;\n}\n\nli.groupChildEle {\n    padding-left: 30px;\n}\n\n.icon_down_dir {\n    position: absolute;\n    right: 10px;\n    top: 50%;\n    transform: translateY(-50%);\n    width: 14px;\n}\n\n.icon_down_dir:before {\n    content: '\\e803';\n}\n\n.custom-close {\n    display: flex;\n}";
n(css,{});

export { css, css as default };
