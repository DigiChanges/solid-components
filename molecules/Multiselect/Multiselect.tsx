import { createSignal, splitProps } from "solid-js";
import "./Multiselect.css"


const Multiselect = (props) => {
  const [local, others] = splitProps(props, ["placeholder", "style", "singleSelect", "id", "hidePlaceholder", "disable", "showArrow", "avoidHighlightFirstOption"]);
  const { placeholder, style, singleSelect, id, hidePlaceholder, disable, showArrow, avoidHighlightFirstOption } = local;

  const [toggleOptionsList, setToggleOptionsList] = createSignal(false)
  const [highlightOption, setHighlightOption] = createSignal(avoidHighlightFirstOption ? -1 : 0)
  const [inputValue, setInputValue] = createSignal('')
  const [options, setOptions] = createSignal(props.options)
  const [filteredOptions, setFilteredOptions] = createSignal(props.options)
  const [unfilteredOptions, setUnfilteredOptions] = createSignal(props.options)
  const [selectedValues, setSelectedValues] = createSignal(Object.assign([], props.selectedValues))
  const [preSelectedValues, setPreSelectedValues] = createSignal(Object.assign([], props.selectedValues))
  const [keepSearchTerm, setKeepSearchTerm] = createSignal(props.keepSearchTerm)


  let optionTimeout = null;
  let searchBox; // = el => setTimeout(() => el.focus(), 0);  // focus on search input after render
  let searchWrapper = el => el.addEventListener("click", listenerCallback);

  const renderGroupByOptions = () => { }

  const isSelectedValue = (item) => {
    if (props.isObject) {
      return (
        selectedValues().filter(i => i[props.displayValue] === item[props.displayValue])
          .length > 0
      );
    }
    return selectedValues().filter(i => i === item).length > 0;
  }
  const fadeOutSelection = (item) => {
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
  }

  const isDisablePreSelectedValues = (value) => {
    if (!props.disablePreSelectedValues || !preSelectedValues().length) {
      return false;
    }
    if (props.isObject) {
      return (
        preSelectedValues().filter(i => i[props.displayValue] === value[props.displayValue])
          .length > 0
      );
    }
    return preSelectedValues().filter(i => i === value).length > 0;
  }

  const removeSelectedValuesFromOptions = (skipCheck) => {

    if (!skipCheck && props.groupBy) {
      // groupByOptions(options());
    }
    if (!selectedValues().length && !skipCheck) {
      return;
    }
    if (props.isObject) {
      let optionList = unfilteredOptions().filter(item => {
        return selectedValues().findIndex(
          v => v[props.displayValue] === item[props.displayValue]
        ) === -1
          ? true
          : false;
      });
      if (props.groupBy) {
        // groupByOptions(optionList);
      }
      setOptions(optionList);
      setFilteredOptions(optionList);
      filterOptionsByInput();
      return;
    }
    let optionList = unfilteredOptions().filter(
      item => selectedValues().indexOf(item) === -1
    );

    setOptions(optionList);
    setFilteredOptions(optionList);
    filterOptionsByInput();
  }

  const onSingleSelect = (item) => {
    setSelectedValues([item]);
    setToggleOptionsList(false);
  }

  const onRemoveSelectedItem = (item) => {
    let index = 0;
    const newSelectedValues = [...selectedValues()];
    if (props.isObject) {
      index = newSelectedValues.findIndex(
        i => i[props.displayValue] === item[props.displayValue]
      );
    } else {
      index = newSelectedValues.indexOf(item);
    }
    newSelectedValues.splice(index, 1);
    props.onRemove(newSelectedValues, item);
    setSelectedValues(newSelectedValues)
    if (!props.showCheckbox) {
      removeSelectedValuesFromOptions(true);
    }
    if (!props.closeOnSelect) {
      searchBox.focus();
    }
  }

  const onSelectItem = (item) => {

    if (!keepSearchTerm) {
      setInputValue("");
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

    const newSelectedValues: any[] = [...selectedValues(), item];

    props.onSelect(newSelectedValues, item);

    setSelectedValues(newSelectedValues)

    if (!props.showCheckbox) {
      removeSelectedValuesFromOptions(true);
    } else {
      filterOptionsByInput();
    }

    if (!props.closeOnSelect) {
      searchBox.focus();
    }
  }

  const renderNormalOption = () => {
    return options().map((option, i) => (
      <li
        key={`option${i}`}
        style={props.style['option']}
        className={`
              ${highlightOption() === i ? `highlightOption highlight` : ""} 
              ${fadeOutSelection(option) && 'disableSelection'} 
              ${isDisablePreSelectedValues(option) && 'disableSelection'} option
            `}
        onClick={() => onSelectItem(option)}
      >
        {props.showCheckbox && !props.singleSelect && (
          <input
            type="checkbox"
            readOnly
            className={`checkbox`}
            checked={isSelectedValue(option)}
          />
        )}
        {props.isObject ? option[props.displayValue] : (option || '').toString()}
      </li>
    ));
  }

  const renderOptionList = () => {
    let loadingMessage = props.loadingMessage ?? 'loading...';
    if (props.loading) {
      return (
        <ul className={`optionContainer`} style={props.style['optionContainer']}>
          {typeof loadingMessage === 'string' && <span style={props.style['loadingMessage']} className={`notFound`}>{loadingMessage}</span>}
          {typeof loadingMessage !== 'string' && loadingMessage}
        </ul>
      );
    }
    return (
      <ul className={`optionContainer`} style={props.style['optionContainer']}>
        {options().length === 0 && <span style={props.style['notFound']} className={`notFound`}>{props.emptyRecordMsg ?? 'no elements'}</span>}
        {!props.groupBy ? renderNormalOption() : renderGroupByOptions()}
      </ul>
    );
  }

  const listenerCallback = () => {
    searchBox.focus();
  }

  const toggelOptionList = () => {
    setToggleOptionsList(!toggleOptionsList())
    setHighlightOption(avoidHighlightFirstOption ? -1 : 0)
  }

  const matchValues = (value, search) => {
    if (props.caseSensitiveSearch) {
      return value.indexOf(search) > -1;
    }
    if (value.toLowerCase) {
      return value.toLowerCase().indexOf(search.toLowerCase()) > -1;
    }
    return value.toString().indexOf(search) > -1;
  }

  const filterOptionsByInput = () => {
    let newOptions: [];
    if (props.isObject) {
      newOptions = filteredOptions().filter(i => matchValues(i[props.displayValue], inputValue()))
    } else {
      newOptions = filteredOptions().filter(i => matchValues(i, inputValue()));
    }
    // groupByOptions(newOptions);
    setOptions(newOptions);
  }

  const onChange = (event) => {
    const { onSearch } = props;
    setInputValue(event.target.value);
    filterOptionsByInput();
    if (onSearch) {
      onSearch(event.target.value);
    }
  }

  const onFocus = () => {
    if (toggleOptionsList()) {
      clearTimeout(optionTimeout);
    } else {
      toggelOptionList();
    }
  }

  const onBlur = () => {
    optionTimeout = setTimeout(toggelOptionList, 250);
  }

  const renderSelectedList = () => {
    return selectedValues().map((value, index) => (
      <span className={`chip  ${props.singleSelect && 'singleChip'} ${isDisablePreSelectedValues(value) && 'disableSelection'}`} key={index} style={props.style['chips']}>
        {!props.isObject ? (value || '').toString() : value[props.displayValue]}
        {!props.singleSelect && (
          <span
            className="close"
            onClick={() => onRemoveSelectedItem(value)}
          >
            &times;
          </span>
        )}
        {!isDisablePreSelectedValues(value) && (!props.customCloseIcon ?
          <img
            className="icon_cancel closeIcon"
            src={"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Angle_down_font_awesome.svg/1200px-Angle_down_font_awesome.svg.png"}
            // src={props.closeIconType}
            onClick={() => onRemoveSelectedItem(value)}
          /> :
          <i className="custom-close" onClick={() => onRemoveSelectedItem(value)}>{props.customCloseIcon}</i>)}
      </span>
    ));
  }

  const renderMultiselectContainer = () => {
    return (
      <div className={`multiselect-container multiSelectContainer ${disable ? `disable_ms` : ''}`} id={id || 'multiselectContainerSolid'} style={style['multiselectContainer']}>
        <h1>Multiselect1</h1>
        <div className={`search-wrapper searchWrapper ${singleSelect ? 'singleSelect' : ''}`}
          ref={searchWrapper} style={style['searchBox']}
          onClick={singleSelect ? toggelOptionList : () => { }}
        >
          {renderSelectedList()}
          <input
            type="text"
            ref={searchBox}
            className="searchBox"
            id={`${id || 'search'}_input`}
            onChange={onChange}
            value={inputValue()}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={((singleSelect && selectedValues().length) || (hidePlaceholder && selectedValues().length)) ? '' : placeholder}
            // onKeyDown={onArrowKeyNavigation}
            style={style['inputField']}
            autoComplete="off"
            disabled={singleSelect || disable}
          />
          {(singleSelect || showArrow) &&
            <img
              src={"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Angle_down_font_awesome.svg/1200px-Angle_down_font_awesome.svg.png"}
              className={`icon_cancel icon_down_dir`}
            />
          }
        </div>
        <div
          className={`optionListContainer ${toggleOptionsList() ? 'displayBlock' : 'displayNone'}`}
        >
          {renderOptionList()}
        </div>
      </div>
    )
  }

  return (
    renderMultiselectContainer()
  );
};

export default Multiselect;
