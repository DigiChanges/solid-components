import { template, delegateEvents, setAttribute, addEventListener, insert, effect, style, memo, createComponent, For } from 'solid-js/web';
import { slicedToArray as _slicedToArray, toConsumableArray as _toConsumableArray } from '../../../_virtual/_rollupPluginBabelHelpers.js';
import { mergeProps, splitProps, createSignal, createEffect, onMount } from 'solid-js';
import classNames from 'classnames';

const _tmpl$ = template(`<div>not implemented</div>`, 2),
      _tmpl$2 = template(`<span class="notFound"></span>`, 2),
      _tmpl$3 = template(`<li></li>`, 2),
      _tmpl$4 = template(`<input type="checkbox" readonly class="checkbox">`, 1),
      _tmpl$5 = template(`<ul class="optionContainer"></ul>`, 2),
      _tmpl$6 = template(`<span></span>`, 2),
      _tmpl$7 = template(`<img class="icon_cancel closeIcon">`, 1),
      _tmpl$8 = template(`<i class="custom-close"></i>`, 2),
      _tmpl$9 = template(`<div><div><input type="text" class="searchBox"></div><div></div></div>`, 7),
      _tmpl$10 = template(`<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Angle_down_font_awesome.svg/1200px-Angle_down_font_awesome.svg.png" class="icon_cancel icon_down_dir">`, 1);

var DownArrow = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Angle_down_font_awesome.svg/1200px-Angle_down_font_awesome.svg.png';
var defaultProps = {
  id: '',
  emptyRecordMsg: 'No records found',
  options: [],
  selectedValues: [],
  showArrow: false,
  singleSelect: false,
  style: {},
  placeholder: 'select',
  onSelect: function onSelect() {},
  onRemove: function onRemove() {}
};
var closeIconTypes = {
  circle: DownArrow,
  circle2: DownArrow // CloseCircle
  // close: CloseSquare,
  // cancel: CloseLine

};
var Multiselect = function Multiselect(props) {
  props = mergeProps(defaultProps, props);

  var _splitProps = splitProps(props, ['placeholder', 'style', 'singleSelect', 'id', 'hidePlaceholder', 'disable', 'showArrow', 'avoidHighlightFirstOption']),
      _splitProps2 = _slicedToArray(_splitProps, 1),
      local = _splitProps2[0];

  var placeholder = local.placeholder,
      style$1 = local.style,
      singleSelect = local.singleSelect,
      id = local.id,
      hidePlaceholder = local.hidePlaceholder,
      disable = local.disable,
      showArrow = local.showArrow,
      avoidHighlightFirstOption = local.avoidHighlightFirstOption;

  var _createSignal = createSignal(false),
      _createSignal2 = _slicedToArray(_createSignal, 2),
      toggleOptionsList = _createSignal2[0],
      setToggleOptionsList = _createSignal2[1];

  var _createSignal3 = createSignal(avoidHighlightFirstOption ? -1 : 0),
      _createSignal4 = _slicedToArray(_createSignal3, 2),
      highlightOption = _createSignal4[0],
      setHighlightOption = _createSignal4[1];

  var _createSignal5 = createSignal(''),
      _createSignal6 = _slicedToArray(_createSignal5, 2),
      inputValue = _createSignal6[0],
      setInputValue = _createSignal6[1];

  var _createSignal7 = createSignal(props.options),
      _createSignal8 = _slicedToArray(_createSignal7, 2),
      options = _createSignal8[0],
      setOptions = _createSignal8[1];

  var _createSignal9 = createSignal(props.options),
      _createSignal10 = _slicedToArray(_createSignal9, 2),
      filteredOptions = _createSignal10[0],
      setFilteredOptions = _createSignal10[1];

  var _createSignal11 = createSignal(props.options),
      _createSignal12 = _slicedToArray(_createSignal11, 2),
      unfilteredOptions = _createSignal12[0],
      setUnfilteredOptions = _createSignal12[1];

  var _createSignal13 = createSignal(Object.assign([], props.selectedValues)),
      _createSignal14 = _slicedToArray(_createSignal13, 2),
      selectedValues = _createSignal14[0],
      setSelectedValues = _createSignal14[1];

  var _createSignal15 = createSignal(Object.assign([], props.selectedValues)),
      _createSignal16 = _slicedToArray(_createSignal15, 2),
      preSelectedValues = _createSignal16[0],
      setPreSelectedValues = _createSignal16[1];

  var _createSignal17 = createSignal(props.keepSearchTerm),
      _createSignal18 = _slicedToArray(_createSignal17, 2),
      keepSearchTerm = _createSignal18[0];
      _createSignal18[1];

  var _createSignal19 = createSignal(closeIconTypes[props.closeIcon] || closeIconTypes['circle']),
      _createSignal20 = _slicedToArray(_createSignal19, 2),
      closeIconType = _createSignal20[0];
      _createSignal20[1];

  var optionTimeout;
  var searchBox;

  var searchWrapper = function searchWrapper(el) {
    return el.addEventListener('click', listenerCallback);
  };

  function renderGroupByOptions() {
    return _tmpl$.cloneNode(true);
  }

  var isSelectedValue = function isSelectedValue(item) {
    if (props.isObject) {
      return selectedValues().filter(function (i) {
        return i[props.displayValue] === item[props.displayValue];
      }).length > 0;
    }

    return selectedValues().filter(function (i) {
      return i === item;
    }).length > 0;
  };

  var fadeOutSelection = function fadeOutSelection(item) {
    if (props.singleSelect) {
      return;
    }

    if (props.selectionLimit == -1) {
      return false;
    }

    if (props.selectionLimit != selectedValues().length) {
      return false;
    }

    if (props.selectionLimit == selectedValues().length) {
      if (!props.showCheckbox) {
        return true;
      } else {
        if (isSelectedValue(item)) {
          return false;
        }

        return true;
      }
    }
  };

  var isDisablePreSelectedValues = function isDisablePreSelectedValues(value) {
    if (!props.disablePreSelectedValues || !preSelectedValues().length) {
      return false;
    }

    if (props.isObject) {
      return preSelectedValues().filter(function (i) {
        return i[props.displayValue] === value[props.displayValue];
      }).length > 0;
    }

    return preSelectedValues().filter(function (i) {
      return i === value;
    }).length > 0;
  };

  var removeSelectedValuesFromOptions = function removeSelectedValuesFromOptions(skipCheck) {
    if (!skipCheck && props.groupBy) ;

    if (!selectedValues().length && !skipCheck) {
      return;
    }

    if (props.isObject) {
      var _optionList = unfilteredOptions().filter(function (item) {
        return selectedValues().findIndex(function (v) {
          return v[props.displayValue] === item[props.displayValue];
        }) === -1 ? true : false;
      });

      if (props.groupBy) ;

      setOptions(_optionList);
      setFilteredOptions(_optionList); // TODO: Fix wait

      setTimeout(function () {
        filterOptionsByInput();
      }, 0);
      return;
    }

    var optionList = unfilteredOptions().filter(function (item) {
      return selectedValues().indexOf(item) === -1;
    });
    setOptions(optionList);
    setFilteredOptions(optionList); // TODO: Fix wait

    setTimeout(function () {
      filterOptionsByInput();
    }, 0);
  };

  var initialSetValue = function initialSetValue() {
    if (!props.showCheckbox && !props.singleSelect) {
      removeSelectedValuesFromOptions(false);
    } // if (props.groupBy) {
    //     groupByOptions(options());
    // }

  };

  createEffect(function (prevOptions) {
    if (JSON.stringify(prevOptions) !== JSON.stringify(props.options)) {
      setOptions(props.options);
      setFilteredOptions(props.options);
      setUnfilteredOptions(props.options); // TODO: Fix wait

      setTimeout(function () {
        initialSetValue();
      }, 0);
    }

    return props.options;
  }, props.options);
  createEffect(function (prevSelectedvalues) {
    if (JSON.stringify(prevSelectedvalues) !== JSON.stringify(props.selectedValues)) {
      setSelectedValues(Object.assign([], props.selectedValues));
      setPreSelectedValues(Object.assign([], props.selectedValues)); // TODO: Fix wait

      setTimeout(function () {
        initialSetValue();
      }, 0);
    }

    return props.selectedValues;
  }, props.selectedValues);
  onMount(function () {
    initialSetValue();
  });

  var onSingleSelect = function onSingleSelect(item) {
    setSelectedValues([item]);
    setToggleOptionsList(false);
  };

  var onRemoveSelectedItem = function onRemoveSelectedItem(item) {
    var index = 0;

    var newSelectedValues = _toConsumableArray(selectedValues());

    if (props.isObject) {
      index = newSelectedValues.findIndex(function (i) {
        return i[props.displayValue] === item[props.displayValue];
      });
    } else {
      index = newSelectedValues.indexOf(item);
    }

    newSelectedValues.splice(index, 1);
    props.onRemove(newSelectedValues, item);
    setSelectedValues(newSelectedValues);

    if (!props.showCheckbox) {
      removeSelectedValuesFromOptions(true);
    }

    if (!props.closeOnSelect) {
      searchBox.focus();
    }
  };

  var onSelectItem = function onSelectItem(item) {
    return function () {
      if (!keepSearchTerm) {
        setInputValue('');
      }

      if (props.singleSelect) {
        onSingleSelect(item);
        props.onSelect([item], item);
        return;
      }

      if (isSelectedValue(item)) {
        onRemoveSelectedItem(item);
        return;
      }

      if (props.selectionLimit == selectedValues().length) {
        return;
      }

      var newSelectedValues = [].concat(_toConsumableArray(selectedValues()), [item]);
      props.onSelect(newSelectedValues, item);
      setSelectedValues(newSelectedValues);

      if (!props.showCheckbox) {
        removeSelectedValuesFromOptions(true);
      } else {
        filterOptionsByInput();
      }

      if (!props.closeOnSelect) {
        searchBox.focus();
      }
    };
  };

  function renderNormalOption() {
    return createComponent(For, {
      get each() {
        return options();
      },

      get fallback() {
        return function () {
          var _el$2 = _tmpl$2.cloneNode(true);

          insert(_el$2, function () {
            var _props$emptyRecordMsg;

            return (_props$emptyRecordMsg = props.emptyRecordMsg) !== null && _props$emptyRecordMsg !== void 0 ? _props$emptyRecordMsg : 'No Options Available';
          });

          effect(function (_$p) {
            return style(_el$2, props.style['notFound'], _$p);
          });

          return _el$2;
        }();
      },

      children: function children(option, index) {
        return function () {
          var _el$3 = _tmpl$3.cloneNode(true);

          addEventListener(_el$3, "click", onSelectItem(option), true);

          insert(_el$3, function () {
            var _c$ = memo(function () {
              return !!(props.showCheckbox && !props.singleSelect);
            }, true);

            return function () {
              return _c$() && function () {
                var _el$4 = _tmpl$4.cloneNode(true);

                effect(function () {
                  return _el$4.checked = isSelectedValue(option);
                });

                return _el$4;
              }();
            };
          }(), null);

          insert(_el$3, function () {
            var _c$2 = memo(function () {
              return !!props.isObject;
            }, true);

            return function () {
              return _c$2() ? option[props.displayValue] : (option || '').toString();
            };
          }(), null);

          effect(function (_p$) {
            var _v$ = props.style['option'],
                _v$2 = classNames('option', {
              'disableSelection': fadeOutSelection(option),
              'highlightOption highlight': highlightOption() === index()
            });

            _p$._v$ = style(_el$3, _v$, _p$._v$);
            _v$2 !== _p$._v$2 && (_el$3.className = _p$._v$2 = _v$2);
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined
          });

          return _el$3;
        }();
      }
    });
  }

  function renderOptionList() {
    var _props$loadingMessage;

    var loadingMessage = (_props$loadingMessage = props.loadingMessage) !== null && _props$loadingMessage !== void 0 ? _props$loadingMessage : 'loading...';

    if (props.loading) {
      return function () {
        var _el$5 = _tmpl$5.cloneNode(true);

        insert(_el$5, typeof loadingMessage === 'string' && function () {
          var _el$6 = _tmpl$2.cloneNode(true);

          insert(_el$6, loadingMessage);

          effect(function (_$p) {
            return style(_el$6, props.style['loadingMessage'], _$p);
          });

          return _el$6;
        }(), null);

        insert(_el$5, typeof loadingMessage !== 'string' && loadingMessage, null);

        effect(function (_$p) {
          return style(_el$5, props.style['optionContainer'], _$p);
        });

        return _el$5;
      }();
    }

    return function () {
      var _el$7 = _tmpl$5.cloneNode(true);

      insert(_el$7, function () {
        var _c$3 = memo(function () {
          return !!!props.groupBy;
        }, true);

        return function () {
          return _c$3() ? renderNormalOption() : renderGroupByOptions();
        };
      }());

      effect(function (_$p) {
        return style(_el$7, props.style['optionContainer'], _$p);
      });

      return _el$7;
    }();
  }

  var listenerCallback = function listenerCallback() {
    searchBox.focus();
  };

  var toggelOptionList = function toggelOptionList() {
    setToggleOptionsList(!toggleOptionsList());
    setHighlightOption(avoidHighlightFirstOption ? -1 : 0);
  };

  var matchValues = function matchValues(value, search) {
    if (props.caseSensitiveSearch) {
      return value.indexOf(search) > -1;
    }

    if (value.toLowerCase) {
      return value.toLowerCase().indexOf(search.toLowerCase()) > -1;
    }

    return value.toString().indexOf(search) > -1;
  };

  var filterOptionsByInput = function filterOptionsByInput() {
    var newOptions;

    if (props.isObject) {
      newOptions = filteredOptions().filter(function (i) {
        return matchValues(i[props.displayValue], inputValue());
      });
    } else {
      newOptions = filteredOptions().filter(function (i) {
        return matchValues(i, inputValue());
      });
    } // groupByOptions(newOptions);


    setOptions(newOptions);
  };

  var onInput = function onInput(event) {
    setInputValue(event.target.value); // TODO: Fix wait setInputValue

    setTimeout(function () {
      filterOptionsByInput();
    }, 0);

    if (props.onSearch) {
      props.onSearch(event.target.value);
    }
  };

  var onFocus = function onFocus() {
    if (toggleOptionsList()) {
      clearTimeout(optionTimeout);
    } else {
      toggelOptionList();
    }
  };

  var onBlur = function onBlur() {
    optionTimeout = setTimeout(toggelOptionList, 250);
  };

  var onArrowKeyNavigation = function onArrowKeyNavigation(e) {
    if (e.keyCode === 8 && !inputValue() && !props.disablePreSelectedValues && selectedValues().length) {
      onRemoveSelectedItem(selectedValues().length - 1);
    }

    if (!options().length) {
      return;
    }

    if (e.keyCode === 38) {
      if (highlightOption() > 0) {
        setHighlightOption(function (previousState) {
          return previousState - 1;
        });
      } else {
        setHighlightOption(options().length - 1);
      }
    } else if (e.keyCode === 40) {
      if (highlightOption() < options().length - 1) {
        setHighlightOption(function (previousState) {
          return previousState + 1;
        });
      } else {
        setHighlightOption(0);
      }
    } else if (e.key === 'Enter' && options().length && toggleOptionsList()) {
      if (highlightOption() === -1) {
        return;
      }

      onSelectItem(options()[highlightOption()])();
    }
  };

  function renderSelectedList() {
    return createComponent(For, {
      get each() {
        return selectedValues();
      },

      children: function children(value) {
        return function () {
          var _el$8 = _tmpl$6.cloneNode(true);

          insert(_el$8, function () {
            var _c$4 = memo(function () {
              return !!!props.isObject;
            }, true);

            return function () {
              return _c$4() ? (value || '').toString() : value[props.displayValue];
            };
          }(), null);

          insert(_el$8, function () {
            var _c$5 = memo(function () {
              return !!!isDisablePreSelectedValues(value);
            }, true);

            return function () {
              return _c$5() && (!props.customCloseIcon ? function () {
                var _el$9 = _tmpl$7.cloneNode(true);

                _el$9.$$click = function () {
                  return onRemoveSelectedItem(value);
                };

                effect(function () {
                  return setAttribute(_el$9, "src", closeIconType());
                });

                return _el$9;
              }() : function () {
                var _el$10 = _tmpl$8.cloneNode(true);

                _el$10.$$click = function () {
                  return onRemoveSelectedItem(value);
                };

                insert(_el$10, function () {
                  return props.customCloseIcon;
                });

                return _el$10;
              }());
            };
          }(), null);

          effect(function (_p$) {
            var _v$3 = classNames('chip', {
              singleChip: props.singleSelect,
              disableSelection: isDisablePreSelectedValues(value)
            }),
                _v$4 = props.style['chips'];

            _v$3 !== _p$._v$3 && (_el$8.className = _p$._v$3 = _v$3);
            _p$._v$4 = style(_el$8, _v$4, _p$._v$4);
            return _p$;
          }, {
            _v$3: undefined,
            _v$4: undefined
          });

          return _el$8;
        }();
      }
    });
  }

  function renderMultiselectContainer() {
    return function () {
      var _el$11 = _tmpl$9.cloneNode(true),
          _el$12 = _el$11.firstChild,
          _el$13 = _el$12.firstChild,
          _el$14 = _el$12.nextSibling;

      setAttribute(_el$11, "id", id || 'multiselectContainerSolid');

      addEventListener(_el$12, "click", singleSelect ? toggelOptionList : function () {}, true);

      var _ref$ = searchWrapper;
      typeof _ref$ === "function" ? _ref$(_el$12) : searchWrapper = _el$12;

      insert(_el$12, renderSelectedList, _el$13);

      _el$13.$$keydown = onArrowKeyNavigation;

      _el$13.addEventListener("blur", onBlur);

      _el$13.addEventListener("focus", onFocus);

      _el$13.$$input = onInput;
      var _ref$2 = searchBox;
      typeof _ref$2 === "function" ? _ref$2(_el$13) : searchBox = _el$13;

      setAttribute(_el$13, "id", "".concat(id || 'search', "_input"));

      _el$13.disabled = singleSelect || disable;

      insert(_el$12, (singleSelect || showArrow) && _tmpl$10.cloneNode(true), null);

      insert(_el$14, renderOptionList);

      effect(function (_p$) {
        var _v$5 = classNames('multiselect-container multiSelectContainer', {
          disable_ms: disable
        }),
            _v$6 = style$1['multiselectContainer'],
            _v$7 = classNames('search-wrapper searchWrapper', {
          singleSelect: singleSelect
        }),
            _v$8 = style$1['searchBox'],
            _v$9 = inputValue(),
            _v$10 = singleSelect && selectedValues().length || hidePlaceholder && selectedValues().length ? '' : placeholder,
            _v$11 = style$1['inputField'],
            _v$12 = classNames('optionListContainer', {
          displayBlock: toggleOptionsList(),
          displayNone: !toggleOptionsList()
        });

        _v$5 !== _p$._v$5 && (_el$11.className = _p$._v$5 = _v$5);
        _p$._v$6 = style(_el$11, _v$6, _p$._v$6);
        _v$7 !== _p$._v$7 && (_el$12.className = _p$._v$7 = _v$7);
        _p$._v$8 = style(_el$12, _v$8, _p$._v$8);
        _v$9 !== _p$._v$9 && (_el$13.value = _p$._v$9 = _v$9);
        _v$10 !== _p$._v$10 && setAttribute(_el$13, "placeholder", _p$._v$10 = _v$10);
        _p$._v$11 = style(_el$13, _v$11, _p$._v$11);
        _v$12 !== _p$._v$12 && (_el$14.className = _p$._v$12 = _v$12);
        return _p$;
      }, {
        _v$5: undefined,
        _v$6: undefined,
        _v$7: undefined,
        _v$8: undefined,
        _v$9: undefined,
        _v$10: undefined,
        _v$11: undefined,
        _v$12: undefined
      });

      return _el$11;
    }();
  }

  return renderMultiselectContainer();
};

delegateEvents(["click", "input", "keydown"]);

export { Multiselect };
