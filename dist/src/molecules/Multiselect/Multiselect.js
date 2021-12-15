import { template, delegateEvents, setAttribute, addEventListener, insert, effect, style, memo, createComponent, For } from 'solid-js/web';
import { mergeProps, splitProps, createSignal, createEffect, onMount } from 'solid-js';
import classNames from 'classnames';
import './Multiselect2.js';

const _tmpl$ = template(`<li class="groupHeading"></li>`, 2),
      _tmpl$2 = template(`<li></li>`, 2),
      _tmpl$3 = template(`<input type="checkbox" class="checkbox" readonly>`, 1),
      _tmpl$4 = template(`<span class="notFound"></span>`, 2),
      _tmpl$5 = template(`<input type="checkbox" readonly class="checkbox">`, 1),
      _tmpl$6 = template(`<ul class="optionContainer"></ul>`, 2),
      _tmpl$7 = template(`<span></span>`, 2),
      _tmpl$8 = template(`<img class="icon_cancel closeIcon">`, 1),
      _tmpl$9 = template(`<i class="custom-close"></i>`, 2),
      _tmpl$10 = template(`<div><div><input type="text" class="searchBox"></div><div></div></div>`, 7),
      _tmpl$11 = template(`<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Angle_down_font_awesome.svg/1200px-Angle_down_font_awesome.svg.png" class="icon_cancel icon_down_dir">`, 1);

const DownArrow = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Angle_down_font_awesome.svg/1200px-Angle_down_font_awesome.svg.png';
const defaultProps = {
  id: '',
  emptyRecordMsg: 'No records found',
  options: [],
  selectedValues: [],
  showArrow: false,
  singleSelect: false,
  style: {},
  placeholder: 'select',
  groupBy: '',
  onSelect: () => {},
  onRemove: () => {}
};
const closeIconTypes = {
  circle: DownArrow,
  circle2: DownArrow // CloseCircle
  // close: CloseSquare,
  // cancel: CloseLine

};
const Multiselect = props => {
  props = mergeProps(defaultProps, props);
  const [local] = splitProps(props, ['placeholder', 'style', 'singleSelect', 'id', 'hidePlaceholder', 'disable', 'showArrow', 'avoidHighlightFirstOption']);
  const {
    placeholder,
    style: style$1,
    singleSelect,
    id,
    hidePlaceholder,
    disable,
    showArrow,
    avoidHighlightFirstOption
  } = local;
  const [toggleOptionsList, setToggleOptionsList] = createSignal(false);
  const [highlightOption, setHighlightOption] = createSignal(avoidHighlightFirstOption ? -1 : 0);
  const [inputValue, setInputValue] = createSignal('');
  const [options, setOptions] = createSignal(props.options);
  const [filteredOptions, setFilteredOptions] = createSignal(props.options);
  const [unfilteredOptions, setUnfilteredOptions] = createSignal(props.options);
  const [selectedValues, setSelectedValues] = createSignal(Object.assign([], props.selectedValues));
  const [preSelectedValues, setPreSelectedValues] = createSignal(Object.assign([], props.selectedValues)); // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [keepSearchTerm, setKeepSearchTerm] = createSignal(props.keepSearchTerm); // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [closeIconType, setCloseIconType] = createSignal(closeIconTypes[props.closeIcon] || closeIconTypes['circle']);
  const [groupedObject, setGroupedObject] = createSignal([]);
  let optionTimeout;
  let searchBox;

  const searchWrapper = el => el.addEventListener('click', listenerCallback);

  function renderGroupByOptions() {
    const isObject = props.isObject || false;
    const displayValue = props.displayValue;
    const showCheckbox = props.showCheckbox;
    const style$1 = props.style;
    const singleSelect = props.singleSelect;
    const groupedObjectKeys = Object.keys(groupedObject());
    return createComponent(For, {
      each: groupedObjectKeys,
      children: objKey => [(() => {
        const _el$ = _tmpl$.cloneNode(true);

        insert(_el$, objKey);

        effect(_$p => style(_el$, style$1['groupHeading'], _$p));

        return _el$;
      })(), createComponent(For, {
        get each() {
          return groupedObject()[objKey];
        },

        children: option => (() => {
          const _el$2 = _tmpl$2.cloneNode(true);

          addEventListener(_el$2, "click", onSelectItem(option), true);

          insert(_el$2, showCheckbox && !singleSelect && (() => {
            const _el$3 = _tmpl$3.cloneNode(true);

            effect(() => _el$3.checked = isSelectedValue(option));

            return _el$3;
          })(), null);

          insert(_el$2, () => isObject ? option[displayValue] : (option || '').toString(), null);

          effect(_p$ => {
            const _v$ = style$1['option'],
                  _v$2 = `
                                        groupChildEle ${fadeOutSelection(option) && 'disableSelection'}
                                        ${isDisablePreSelectedValues(option) && 'disableSelection'} option
                                    `;
            _p$._v$ = style(_el$2, _v$, _p$._v$);
            _v$2 !== _p$._v$2 && (_el$2.className = _p$._v$2 = _v$2);
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined
          });

          return _el$2;
        })()
      })]
    });
  }

  const isSelectedValue = item => {
    if (props.isObject) {
      return selectedValues().filter(i => i[props.displayValue] === item[props.displayValue]).length > 0;
    }

    return selectedValues().filter(i => i === item).length > 0;
  };

  const fadeOutSelection = item => {
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

  const isDisablePreSelectedValues = value => {
    if (!props.disablePreSelectedValues || !preSelectedValues().length) {
      return false;
    }

    if (props.isObject) {
      return preSelectedValues().filter(i => i[props.displayValue] === value[props.displayValue]).length > 0;
    }

    return preSelectedValues().filter(i => i === value).length > 0;
  };

  const removeSelectedValuesFromOptions = skipCheck => {
    if (!skipCheck && props.groupBy) {
      groupByOptions(options());
    }

    if (!selectedValues().length && !skipCheck) {
      return;
    }

    if (props.isObject) {
      const optionList = unfilteredOptions().filter(item => {
        return selectedValues().findIndex(v => v[props.displayValue] === item[props.displayValue]) === -1 ? true : false;
      });

      if (props.groupBy) {
        groupByOptions(optionList);
      }

      setOptions(optionList);
      setFilteredOptions(optionList); // TODO: Fix wait

      setTimeout(() => {
        filterOptionsByInput();
      }, 0);
      return;
    }

    const optionList = unfilteredOptions().filter(item => selectedValues().indexOf(item) === -1);
    setOptions(optionList);
    setFilteredOptions(optionList); // TODO: Fix wait

    setTimeout(() => {
      filterOptionsByInput();
    }, 0);
  };

  const initialSetValue = () => {
    if (!props.showCheckbox && !props.singleSelect) {
      removeSelectedValuesFromOptions(false);
    }

    if (props.groupBy) {
      groupByOptions(options());
    }
  };

  createEffect(prevOptions => {
    if (JSON.stringify(prevOptions) !== JSON.stringify(props.options)) {
      setOptions(props.options);
      setFilteredOptions(props.options);
      setUnfilteredOptions(props.options); // TODO: Fix wait

      setTimeout(() => {
        initialSetValue();
      }, 0);
    }

    return props.options;
  }, props.options);
  createEffect(prevSelectedvalues => {
    if (JSON.stringify(prevSelectedvalues) !== JSON.stringify(props.selectedValues)) {
      setSelectedValues(Object.assign([], props.selectedValues));
      setPreSelectedValues(Object.assign([], props.selectedValues)); // TODO: Fix wait

      setTimeout(() => {
        initialSetValue();
      }, 0);
    }

    return props.selectedValues;
  }, props.selectedValues);
  onMount(() => {
    initialSetValue();
  });

  const onSingleSelect = item => {
    setSelectedValues([item]);
    setToggleOptionsList(false);
  };

  const onRemoveSelectedItem = item => {
    let index = 0;
    const newSelectedValues = [...selectedValues()];

    if (props.isObject) {
      index = newSelectedValues.findIndex(i => i[props.displayValue] === item[props.displayValue]);
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

  const onSelectItem = item => () => {
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

    const newValuesSelected = [...selectedValues(), item];
    props.onSelect(newValuesSelected, item);
    setSelectedValues(newValuesSelected);

    if (!props.showCheckbox) {
      removeSelectedValuesFromOptions(true);
    } else {
      filterOptionsByInput();
    }

    if (!props.closeOnSelect) {
      searchBox.focus();
    }
  };

  function renderNormalOption() {
    return createComponent(For, {
      get each() {
        return options();
      },

      get fallback() {
        return (() => {
          const _el$4 = _tmpl$4.cloneNode(true);

          insert(_el$4, () => props.emptyRecordMsg ?? 'No Options Available');

          effect(_$p => style(_el$4, props.style['notFound'], _$p));

          return _el$4;
        })();
      },

      children: (option, index) => (() => {
        const _el$5 = _tmpl$2.cloneNode(true);

        addEventListener(_el$5, "click", onSelectItem(option), true);

        insert(_el$5, (() => {
          const _c$ = memo(() => !!(props.showCheckbox && !props.singleSelect), true);

          return () => _c$() && (() => {
            const _el$6 = _tmpl$5.cloneNode(true);

            effect(() => _el$6.checked = isSelectedValue(option));

            return _el$6;
          })();
        })(), null);

        insert(_el$5, (() => {
          const _c$2 = memo(() => !!props.isObject, true);

          return () => _c$2() ? option[props.displayValue] : (option || '').toString();
        })(), null);

        effect(_p$ => {
          const _v$3 = props.style['option'],
                _v$4 = classNames('option', {
            'disableSelection': fadeOutSelection(option),
            'highlightOption highlight': highlightOption() === index()
          });

          _p$._v$3 = style(_el$5, _v$3, _p$._v$3);
          _v$4 !== _p$._v$4 && (_el$5.className = _p$._v$4 = _v$4);
          return _p$;
        }, {
          _v$3: undefined,
          _v$4: undefined
        });

        return _el$5;
      })()
    });
  }

  function renderOptionList() {
    const loadingMessage = props.loadingMessage ?? 'loading...';

    if (props.loading) {
      return (() => {
        const _el$7 = _tmpl$6.cloneNode(true);

        insert(_el$7, typeof loadingMessage === 'string' && (() => {
          const _el$8 = _tmpl$4.cloneNode(true);

          insert(_el$8, loadingMessage);

          effect(_$p => style(_el$8, props.style['loadingMessage'], _$p));

          return _el$8;
        })(), null);

        insert(_el$7, typeof loadingMessage !== 'string' && loadingMessage, null);

        effect(_$p => style(_el$7, props.style['optionContainer'], _$p));

        return _el$7;
      })();
    }

    return (() => {
      const _el$9 = _tmpl$6.cloneNode(true);

      insert(_el$9, (() => {
        const _c$3 = memo(() => !!!props.groupBy, true);

        return () => _c$3() ? renderNormalOption() : renderGroupByOptions();
      })());

      effect(_$p => style(_el$9, props.style['optionContainer'], _$p));

      return _el$9;
    })();
  }

  const listenerCallback = () => {
    searchBox.focus();
  };

  const toggleOptionList = () => {
    setToggleOptionsList(!toggleOptionsList());
    setHighlightOption(avoidHighlightFirstOption ? -1 : 0);
  };

  const matchValues = (value, search) => {
    if (props.caseSensitiveSearch) {
      return value.indexOf(search) > -1;
    }

    if (value.toLowerCase) {
      return value.toLowerCase().indexOf(search.toLowerCase()) > -1;
    }

    return value.toString().indexOf(search) > -1;
  };

  const filterOptionsByInput = () => {
    let newOptions;

    if (props.isObject) {
      newOptions = filteredOptions().filter(i => matchValues(i[props.displayValue], inputValue()));
    } else {
      newOptions = filteredOptions().filter(i => matchValues(i, inputValue()));
    }

    groupByOptions(newOptions);
    setOptions(newOptions);
  };

  const groupByOptions = options => {
    const groupBy = props.groupBy;
    const groupedObject = options.reduce(function (r, a) {
      const key = a[groupBy] || 'Others';
      r[key] = r[key] || [];
      r[key].push(a);
      return r;
    }, Object.create({}));
    setGroupedObject(groupedObject);
  };

  const onInput = event => {
    setInputValue(event.target.value); // TODO: Fix wait setInputValue

    setTimeout(() => {
      filterOptionsByInput();
    }, 0);

    if (props.onSearch) {
      props.onSearch(event.target.value);
    }
  };

  const onFocus = () => {
    if (toggleOptionsList()) {
      clearTimeout(optionTimeout);
    } else {
      toggleOptionList();
    }
  };

  const onBlur = () => {
    optionTimeout = setTimeout(toggleOptionList, 250);
  };

  const onArrowKeyNavigation = e => {
    if (e.keyCode === 8 && !inputValue() && !props.disablePreSelectedValues && selectedValues().length) {
      onRemoveSelectedItem(selectedValues().length - 1);
    }

    if (!options().length) {
      return;
    }

    if (e.keyCode === 38) {
      if (highlightOption() > 0) {
        setHighlightOption(previousState => previousState - 1);
      } else {
        setHighlightOption(options().length - 1);
      }
    } else if (e.keyCode === 40) {
      if (highlightOption() < options().length - 1) {
        setHighlightOption(previousState => previousState + 1);
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

      children: value => (() => {
        const _el$10 = _tmpl$7.cloneNode(true);

        insert(_el$10, (() => {
          const _c$4 = memo(() => !!!props.isObject, true);

          return () => _c$4() ? (value || '').toString() : value[props.displayValue];
        })(), null);

        insert(_el$10, (() => {
          const _c$5 = memo(() => !!!isDisablePreSelectedValues(value), true);

          return () => _c$5() && (!props.customCloseIcon ? (() => {
            const _el$11 = _tmpl$8.cloneNode(true);

            _el$11.$$click = () => onRemoveSelectedItem(value);

            effect(() => setAttribute(_el$11, "src", closeIconType()));

            return _el$11;
          })() : (() => {
            const _el$12 = _tmpl$9.cloneNode(true);

            _el$12.$$click = () => onRemoveSelectedItem(value);

            insert(_el$12, () => props.customCloseIcon);

            return _el$12;
          })());
        })(), null);

        effect(_p$ => {
          const _v$5 = classNames('chip', {
            singleChip: props.singleSelect,
            disableSelection: isDisablePreSelectedValues(value)
          }),
                _v$6 = props.style['chips'];

          _v$5 !== _p$._v$5 && (_el$10.className = _p$._v$5 = _v$5);
          _p$._v$6 = style(_el$10, _v$6, _p$._v$6);
          return _p$;
        }, {
          _v$5: undefined,
          _v$6: undefined
        });

        return _el$10;
      })()
    });
  }

  function renderMultiselectContainer() {
    return (() => {
      const _el$13 = _tmpl$10.cloneNode(true),
            _el$14 = _el$13.firstChild,
            _el$15 = _el$14.firstChild,
            _el$16 = _el$14.nextSibling;

      setAttribute(_el$13, "id", id || 'multiselectContainerSolid');

      addEventListener(_el$14, "click", singleSelect ? toggleOptionList : () => {}, true);

      searchWrapper(_el$14);

      insert(_el$14, renderSelectedList, _el$15);

      _el$15.$$keydown = onArrowKeyNavigation;

      _el$15.addEventListener("blur", onBlur);

      _el$15.addEventListener("focus", onFocus);

      _el$15.$$input = onInput;
      const _ref$ = searchBox;
      typeof _ref$ === "function" ? _ref$(_el$15) : searchBox = _el$15;

      setAttribute(_el$15, "id", `${id || 'search'}_input`);

      _el$15.disabled = singleSelect || disable;

      insert(_el$14, (singleSelect || showArrow) && _tmpl$11.cloneNode(true), null);

      insert(_el$16, renderOptionList);

      effect(_p$ => {
        const _v$7 = classNames('multiselect-container multiSelectContainer', {
          disable_ms: disable
        }),
              _v$8 = style$1['multiselectContainer'],
              _v$9 = classNames('search-wrapper searchWrapper', {
          singleSelect
        }),
              _v$10 = style$1['searchBox'],
              _v$11 = inputValue(),
              _v$12 = singleSelect && selectedValues().length || hidePlaceholder && selectedValues().length ? '' : placeholder,
              _v$13 = style$1['inputField'],
              _v$14 = classNames('optionListContainer', {
          displayBlock: toggleOptionsList(),
          displayNone: !toggleOptionsList()
        });

        _v$7 !== _p$._v$7 && (_el$13.className = _p$._v$7 = _v$7);
        _p$._v$8 = style(_el$13, _v$8, _p$._v$8);
        _v$9 !== _p$._v$9 && (_el$14.className = _p$._v$9 = _v$9);
        _p$._v$10 = style(_el$14, _v$10, _p$._v$10);
        _v$11 !== _p$._v$11 && (_el$15.value = _p$._v$11 = _v$11);
        _v$12 !== _p$._v$12 && setAttribute(_el$15, "placeholder", _p$._v$12 = _v$12);
        _p$._v$13 = style(_el$15, _v$13, _p$._v$13);
        _v$14 !== _p$._v$14 && (_el$16.className = _p$._v$14 = _v$14);
        return _p$;
      }, {
        _v$7: undefined,
        _v$8: undefined,
        _v$9: undefined,
        _v$10: undefined,
        _v$11: undefined,
        _v$12: undefined,
        _v$13: undefined,
        _v$14: undefined
      });

      return _el$13;
    })();
  }

  return renderMultiselectContainer();
};

delegateEvents(["click", "input", "keydown"]);

export { Multiselect, Multiselect as default };
