import { Component } from 'solid-js';
import './Multiselect.css';
declare type Option = {
    item: Record<string, string | number> | string | number;
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
    onSelect?: (selectedList: Option[], selectedItem: Option) => void;
    onRemove?: (selectedList: Option[], selectedItem: Option) => void;
    onSearch?: (value: string) => void;
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
export declare const Multiselect: Component<IMultiselectProps>;
export {};
