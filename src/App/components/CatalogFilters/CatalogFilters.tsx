import styles from './CatalogFilters.module.scss';
import Button from '~components/Button';
import Text from '~components/Text';
import type { SearchRecipesProps } from './types';
import SearchFilter from '~App/components/CatalogFilters/SearchFilter';
import CategoriesFilter from '~App/components/CatalogFilters/CategoriesFilter';

const CatalogFilters: React.FC<SearchRecipesProps> = ({ totatItems }) => {
    const resetFilters = () => {
        console.log('reset filter. code it')
    }
    return (
        <div className={styles.container}>
            <SearchFilter />
            <div className={styles.filterandsort}>
                <CategoriesFilter />
            </div>
            <div className={styles.container__resultOrReset}>
                <div className={styles['container__result']}>
                    {
                        totatItems === 0
                        && <Text tag="h3">Nothing found matching your criteria. Try changing your filters.</Text>
                    }
                    <Button onClick={resetFilters}>Reset filters</Button>
                </div>
            </div>
        </div>
    );
}
export default CatalogFilters;