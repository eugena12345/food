import Input from "~App/components/Input/Input";
import Button from "~components/Button/Button";
import styles from './SearchByTitle.module.scss';
import { useState } from "react";


const SearchByTitle = () => {
    const [value, setValue] = useState('')





    return (
        <div className={styles['search__container']}>
            <Input
                placeholder="Search product"
                onChange={setValue}
                value={value}
                className={styles['search__container--input']}
            />
            <Button>Find now</Button>
        </div>
    )
};

export default SearchByTitle;