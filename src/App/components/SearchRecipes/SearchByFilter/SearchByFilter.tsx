import MultiDropdown, { type Option } from "~App/components/MultiDropdown";
import styles from './SearchByFilter.module.scss';


const SearchByFilter = () => {


    const getTitle = () => {
        //console.log('getTitle')
        return 'title'
    }

    const onChange = (value: Option[]) => {
        //console.log(value)
    };


    return (
        <MultiDropdown
            options={[{ key: 'string', value: 'string' }, { key: 'number', value: 'number' }]}
            value={[{ key: 'string', value: 'string' }]}
            onChange={onChange}
            getTitle={getTitle}
            className={styles['container__filter']}
        />
    )
};

export default SearchByFilter;