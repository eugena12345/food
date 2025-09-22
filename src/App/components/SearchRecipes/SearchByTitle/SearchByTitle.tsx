import Input from "~App/components/Input";
import Button from "~components/Button";
import styles from './SearchByTitle.module.scss';
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const SearchByTitle = () => {
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const oldValue = searchParams.get('filterByName');
        if (oldValue || oldValue === '') {
            setValue(oldValue);
        }
    }, [searchParams]);

    const getRecepies = () => {
        searchParams.set('filterByName', `${value}`);
        searchParams.set('page', '1');
        setSearchParams(searchParams);
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