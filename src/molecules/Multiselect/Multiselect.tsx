import { createEffect, createSignal, mergeProps, splitProps, onMount, Component } from 'solid-js';
import { For } from 'solid-js/web';
import classNames from 'classnames';
import './Multiselect.css';

// const DownArrow = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Angle_down_font_awesome.svg/1200px-Angle_down_font_awesome.svg.png';
const DownArrow = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Angle_down_font_awesome.svg/1200px-Angle_down_font_awesome.svg.png';

type Option = {
    item: Record<string, string | number> | string | number;
}

const defaultProps = {
    id: '',
    emptyRecordMsg: 'No records found',
    options: [],
    selectedValues: [],
    showArrow: false,
    singleSelect: false,
    style: {},
    placeholder: 'select',
    onSelect: () =>
    {},
    onRemove: () =>
    {}
};

export interface IMultiselectProps {
    options: Option[];
    disablePreSelectedValues?: boolean;
    selectedValues?: Option[];
    isObject?: boolean;
    displayValue?: string;
    showCheckbox?: boolean;
    selectionLimit?: number;
    placeholder?: string;
    groupBy?: string;
    style?: object;
    emptyRecordMsg?: string;
    onSelect?: ( selectedList: Option[], selectedItem: Option ) => void;
    onRemove?: ( selectedList: Option[], selectedItem: Option ) => void;
    onSearch?: ( value:string ) => void;
    closeIcon?: string;
    singleSelect?: boolean;
    caseSensitiveSearch?: boolean;
    id?: string;
    closeOnSelect?: boolean;
    avoidHighlightFirstOption?: boolean;
    hidePlaceholder?: boolean;
    showArrow?: boolean;
    keepSearchTerm?: boolean;
    disable?: boolean;
    loading?: boolean;
    loadingMessage?: string;
    customCloseIcon?: Element | string;
}

const closeIconTypes = {
    circle: DownArrow, // CloseCircleDark,
    circle2: DownArrow // CloseCircle
    // close: CloseSquare,
    // cancel: CloseLine
};

export const Multiselect: Component<IMultiselectProps> = ( props: IMultiselectProps ) =>
{
    props = mergeProps( defaultProps, props );
    const [ local ] = splitProps( props, [ 'placeholder', 'style', 'singleSelect', 'id', 'hidePlaceholder', 'disable', 'showArrow', 'avoidHighlightFirstOption' ] );
    const { placeholder, style, singleSelect, id, hidePlaceholder, disable, showArrow, avoidHighlightFirstOption } = local;

    const [ toggleOptionsList, setToggleOptionsList ] = createSignal( false );
    const [ highlightOption, setHighlightOption ] = createSignal( avoidHighlightFirstOption ? -1 : 0 );
    const [ inputValue, setInputValue ] = createSignal( '' );
    const [ options, setOptions ] = createSignal<Option[]>( props.options );
    const [ filteredOptions, setFilteredOptions ] = createSignal( props.options );
    const [ unfilteredOptions, setUnfilteredOptions ] = createSignal( props.options );
    const [ selectedValues, setSelectedValues ] = createSignal<Option[]>( Object.assign( [], props.selectedValues ) );
    const [ preSelectedValues, setPreSelectedValues ] = createSignal( Object.assign( [], props.selectedValues ) );
    const [ keepSearchTerm, setKeepSearchTerm ] = createSignal( props.keepSearchTerm );
    const [ closeIconType, setCloseIconType ] = createSignal( closeIconTypes[props.closeIcon] || closeIconTypes['circle'] );


    let optionTimeout: NodeJS.Timeout;
    let searchBox: HTMLInputElement;
    const searchWrapper = ( el: HTMLInputElement ) => el.addEventListener( 'click', listenerCallback );

    function renderGroupByOptions ()
    {
        return ( <div>not implemented</div> );
    }

    const isSelectedValue = ( item: Option ) =>
    {
        if ( props.isObject )
        {
            return (
                selectedValues().filter( ( i: Option ) => i[props.displayValue] === item[props.displayValue] )
                    .length > 0
            );
        }
        return selectedValues().filter( i => i === item ).length > 0;
    };
    const fadeOutSelection = ( item: Option ) =>
    {
        if ( props.singleSelect )
        {
            return;
        }
        if ( props.selectionLimit == -1 )
        {
            return false;
        }
        if ( props.selectionLimit != selectedValues().length )
        {
            return false;
        }
        if ( props.selectionLimit == selectedValues().length )
        {
            if ( !props.showCheckbox )
            {
                return true;
            }
            else
            {
                if ( isSelectedValue( item ) )
                {
                    return false;
                }
                return true;
            }
        }
    };

    const isDisablePreSelectedValues = ( value ) =>
    {
        if ( !props.disablePreSelectedValues || !preSelectedValues().length )
        {
            return false;
        }
        if ( props.isObject )
        {
            return (
                preSelectedValues().filter( i => i[props.displayValue] === value[props.displayValue] )
                    .length > 0
            );
        }
        return preSelectedValues().filter( i => i === value ).length > 0;
    };

    const removeSelectedValuesFromOptions = ( skipCheck ) =>
    {

        if ( !skipCheck && props.groupBy )
        {
            // groupByOptions(options());
        }
        if ( !selectedValues().length && !skipCheck )
        {
            return;
        }
        if ( props.isObject )
        {
            const optionList = unfilteredOptions().filter( item =>
            {
                return selectedValues().findIndex(
                    v => v[props.displayValue] === item[props.displayValue]
                ) === -1
                    ? true
                    : false;
            } );
            if ( props.groupBy )
            {
                // groupByOptions(optionList);
            }
            setOptions( optionList );
            setFilteredOptions( optionList );
            // TODO: Fix wait
            setTimeout( () =>
            {
                filterOptionsByInput();
            }, 0 );
            return;
        }
        const optionList = unfilteredOptions().filter(
            item => selectedValues().indexOf( item ) === -1
        );

        setOptions( optionList );
        setFilteredOptions( optionList );
        // TODO: Fix wait
        setTimeout( () =>
        {
            filterOptionsByInput();
        }, 0 );
    };

    const initialSetValue = () =>
    {

        if ( !props.showCheckbox && !props.singleSelect )
        {
            removeSelectedValuesFromOptions( false );
        }

        // if (props.groupBy) {
        //     groupByOptions(options());
        // }
    };

    createEffect( ( prevOptions ) =>
    {
        if ( JSON.stringify( prevOptions ) !== JSON.stringify( props.options ) )
        {
            setOptions( props.options );
            setFilteredOptions( props.options );
            setUnfilteredOptions( props.options );
            // TODO: Fix wait
            setTimeout( () =>
            {
                initialSetValue();
            }, 0 );
        }
        return props.options;
    }, props.options );

    createEffect( ( prevSelectedvalues ) =>
    {
        if ( JSON.stringify( prevSelectedvalues ) !== JSON.stringify( props.selectedValues ) )
        {
            setSelectedValues( Object.assign( [], props.selectedValues ) );
            setPreSelectedValues( Object.assign( [], props.selectedValues ) );
            // TODO: Fix wait
            setTimeout( () =>
            {
                initialSetValue();
            }, 0 );
        }
        return props.selectedValues;
    }, props.selectedValues );

    onMount( () =>
    {
        initialSetValue();
    } );

    const onSingleSelect = ( item ) =>
    {
        setSelectedValues( [ item ] );
        setToggleOptionsList( false );
    };

    const onRemoveSelectedItem = ( item ) =>
    {
        let index = 0;
        const newSelectedValues = [ ...selectedValues() ];
        if ( props.isObject )
        {
            index = newSelectedValues.findIndex(
                i => i[props.displayValue] === item[props.displayValue]
            );
        }
        else
        {
            index = newSelectedValues.indexOf( item );
        }
        newSelectedValues.splice( index, 1 );
        props.onRemove( newSelectedValues, item );
        setSelectedValues( newSelectedValues );
        if ( !props.showCheckbox )
        {
            removeSelectedValuesFromOptions( true );
        }
        if ( !props.closeOnSelect )
        {
            searchBox.focus();
        }
    };

    const onSelectItem = ( item: Option ) => () =>
    {

        if ( !keepSearchTerm )
        {
            setInputValue( '' );
        }
        if ( props.singleSelect )
        {
            onSingleSelect( item );
            props.onSelect( [ item ], item );
            return;
        }
        if ( isSelectedValue( item ) )
        {
            onRemoveSelectedItem( item );
            return;
        }
        if ( props.selectionLimit == selectedValues().length )
        {
            return;
        }

        const newSelectedValues: Option[] = [ ...selectedValues(), item ];

        props.onSelect( newSelectedValues, item );

        setSelectedValues( newSelectedValues );

        if ( !props.showCheckbox )
        {
            removeSelectedValuesFromOptions( true );
        }
        else
        {
            filterOptionsByInput();
        }

        if ( !props.closeOnSelect )
        {
            searchBox.focus();
        }
    };

    function renderNormalOption ()
    {
        return (
            <For each={ options() } fallback={
                <span style={props.style['notFound']} class={'notFound'}>
                    {props.emptyRecordMsg ?? 'No Options Available'}
                </span>
            }>
                {( option, index ) =>
                    <li
                        style={props.style['option']}
                        class={classNames( 'option', {
                            'disableSelection': fadeOutSelection( option ),
                            'highlightOption highlight': highlightOption() === index()
                        } ) }
                        onClick={onSelectItem( option )}
                    >
                        {props.showCheckbox && !props.singleSelect && (
                            <input
                                type="checkbox"
                                readOnly
                                class="checkbox"
                                checked={isSelectedValue( option )}
                            />
                        )}
                        {props.isObject ? option[props.displayValue] : ( option || '' ).toString()}
                    </li>}
            </For>
        );
    }

    function renderOptionList ()
    {
        const loadingMessage = props.loadingMessage ?? 'loading...';
        if ( props.loading )
        {
            return (
                <ul class="optionContainer" style={props.style['optionContainer']}>
                    {typeof loadingMessage === 'string' && <span style={props.style['loadingMessage']} class="notFound">{loadingMessage}</span>}
                    {typeof loadingMessage !== 'string' && loadingMessage}
                </ul>
            );
        }
        return (
            <ul class="optionContainer" style={props.style['optionContainer']}>
                {!props.groupBy ? renderNormalOption() : renderGroupByOptions()}
            </ul>
        );
    }

    const listenerCallback = () =>
    {
        searchBox.focus();
    };

    const toggelOptionList = () =>
    {
        setToggleOptionsList( !toggleOptionsList() );
        setHighlightOption( avoidHighlightFirstOption ? -1 : 0 );
    };

    const matchValues = ( value, search ) =>
    {
        if ( props.caseSensitiveSearch )
        {
            return value.indexOf( search ) > -1;
        }
        if ( value.toLowerCase )
        {
            return value.toLowerCase().indexOf( search.toLowerCase() ) > -1;
        }
        return value.toString().indexOf( search ) > -1;
    };

    const filterOptionsByInput = () =>
    {
        let newOptions: Option[];
        if ( props.isObject )
        {
            newOptions = filteredOptions().filter( i => matchValues( i[props.displayValue], inputValue() ) );
        }
        else
        {
            newOptions = filteredOptions().filter( i => matchValues( i, inputValue() ) );
        }
        // groupByOptions(newOptions);
        setOptions( newOptions );
    };

    const onInput = ( event ) =>
    {
        setInputValue( event.target.value );
        // TODO: Fix wait setInputValue
        setTimeout( () =>
        {
            filterOptionsByInput();
        }, 0 );
        if ( props.onSearch )
        {
            props.onSearch( event.target.value );
        }
    };

    const onFocus = () =>
    {
        if ( toggleOptionsList() )
        {
            clearTimeout( optionTimeout );
        }
        else
        {
            toggelOptionList();
        }
    };

    const onBlur = () =>
    {
        optionTimeout = setTimeout( toggelOptionList, 250 );
    };

    const onArrowKeyNavigation = ( e ) =>
    {
        if ( e.keyCode === 8 && !inputValue() && !props.disablePreSelectedValues && selectedValues().length )
        {
            onRemoveSelectedItem( selectedValues().length - 1 );
        }
        if ( !options().length )
        {
            return;
        }
        if ( e.keyCode === 38 )
        {
            if ( highlightOption() > 0 )
            {
                setHighlightOption( ( previousState ) => previousState - 1 );
            }
            else
            {
                setHighlightOption( options().length - 1 );
            }
        }
        else if ( e.keyCode === 40 )
        {
            if ( highlightOption() < options().length - 1 )
            {
                setHighlightOption( ( previousState ) => previousState + 1 );
            }
            else
            {
                setHighlightOption( 0 );
            }
        }
        else if ( e.key === 'Enter' && options().length && toggleOptionsList() )
        {
            if ( highlightOption() === -1 )
            {
                return;
            }
            onSelectItem( options()[highlightOption()] )();
        }
    };

    function renderSelectedList ()
    {
        return  (
            <For each={selectedValues()} >
                { ( value ) =>
                    <span
                        class={classNames( 'chip', {
                            singleChip: props.singleSelect,
                            disableSelection: isDisablePreSelectedValues( value )
                        } )}
                        style={props.style['chips']}
                    >
                        {!props.isObject ? ( value || '' ).toString() : value[props.displayValue]}
                        {!isDisablePreSelectedValues( value ) && ( !props.customCloseIcon ?
                            <img
                                class="icon_cancel closeIcon"
                                src={closeIconType()}
                                onClick={() => onRemoveSelectedItem( value )}
                            /> :
                            <i class="custom-close" onClick={() => onRemoveSelectedItem( value )}>{props.customCloseIcon}</i> )}
                    </span>}
            </For>
        );
    }

    function renderMultiselectContainer ()
    {
        return (
            <div class={classNames( 'multiselect-container multiSelectContainer', { disable_ms : disable } )}
                id={id || 'multiselectContainerSolid'}
                style={style['multiselectContainer']}
            >
                <div class={classNames( 'search-wrapper searchWrapper', { singleSelect } )}
                    ref={searchWrapper} style={style['searchBox']}
                    onClick={singleSelect ? toggelOptionList : () =>
                    { }}
                >
                    {renderSelectedList()}
                    <input
                        type="text"
                        ref={searchBox}
                        class="searchBox"
                        id={`${id || 'search'}_input`}
                        onInput={onInput}
                        value={inputValue()}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        placeholder={( ( singleSelect && selectedValues().length ) || ( hidePlaceholder && selectedValues().length ) ) ? '' : placeholder}
                        onKeyDown={onArrowKeyNavigation}
                        style={style['inputField']}
                        // autoComplete="off"
                        disabled={singleSelect || disable}
                    />
                    {( singleSelect || showArrow ) &&
                    <img
                        src={DownArrow}
                        class="icon_cancel icon_down_dir"
                    />
                    }
                </div>
                <div
                    class={classNames( 'optionListContainer',  { displayBlock : toggleOptionsList(), displayNone: !toggleOptionsList() } )}
                >
                    {renderOptionList()}
                </div>
            </div>
        );
    }


    return renderMultiselectContainer();
};
