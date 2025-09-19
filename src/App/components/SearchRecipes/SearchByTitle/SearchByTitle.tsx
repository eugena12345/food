import Input from "~App/components/Input/Input";
import Button from "~components/Button/Button";
import styles from './SearchByTitle.module.scss';
import { useEffect, useState } from "react";
import rootStore from "~store/RootStore/instance";
import { useSearchParams } from "react-router";


const SearchByTitle = () => {
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const oldValue = searchParams.get('filterByName');
        console.log(oldValue)
        if (oldValue || oldValue === '') {
            setValue(oldValue);
        }
    }, [searchParams]);

    const getRecepies = () => {
        //rootStore.query.setSearch('filterByName', )
        searchParams.set('filterByName', `${value}`);
        setSearchParams(searchParams);
        console.log('filterByName', `${value}`)
    }



    return (
        <div className={styles['search__container']}>
            <Input
                placeholder="Search product"
                onChange={setValue}
                value={value}
                className={styles['search__container--input']}
            />
            <Button onClick={getRecepies}>Find now</Button>
        </div>
    )
};

export default SearchByTitle;