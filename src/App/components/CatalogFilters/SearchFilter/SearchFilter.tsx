import Input from "~App/components/Input";
import Button from "~components/Button";
import styles from './SearchFilter.module.scss';
import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useLocalStore } from "~utils/useLocalStore";
import CatalogFiltersStore from "~store/CatalogStore/CatalogFiltersStore/CatalogFiltersStore";

const SearchFilter = () => {
    const catalogFiltersStore = useLocalStore(() => new CatalogFiltersStore());
    const { tempSearch, setTempSearch, setSearch } = catalogFiltersStore;

    const handleInputChange = useCallback((value: string) => {
        setTempSearch(value);
    }, []);

    const handleButtonClock = useCallback(() => {
        setSearch();
    }, []);


    return (
        <div className={styles['search__container']}>
            <Input
                placeholder="Search product"
                onChange={handleInputChange}
                value={tempSearch}
                className={styles['search__container--input']}
            />
            <Button onClick={handleButtonClock}>Find now</Button>
        </div>
    )
};

export default observer(SearchFilter);