import Input from "App/components/Input/Input";
import Button from "components/Button/Button";
import styles from './SearchByTitle.module.scss';
import { useState } from "react";


const SearchByTitle = () => {
    const [value, setValue] = useState('')

    const handleInputChange = (searchQuery: string) => {
        setValue(searchQuery);
    };




    return (
        <div className={styles['container__search']}>
            <Input
                placeholder="Search product"
                onChange={handleInputChange}
                value={value}
                className={styles['container__search--grow']}
            />
            <Button>Find now</Button>
        </div>
    )
};

export default SearchByTitle;