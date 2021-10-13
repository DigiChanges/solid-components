// import './Select.css';

export const handleChange = ( { onChange }: { onChange: Function } ): any => ( event: any ) =>
{
    onChange( event ) ;
} ;

const Select = ( props: any ): any => (
    <select
        onChange={ handleChange( { onChange: props.onChange } ) }
    >
        <option value="01">01</option>
        <option value="02">02</option>
    </select>
) ;

export default Select ;
