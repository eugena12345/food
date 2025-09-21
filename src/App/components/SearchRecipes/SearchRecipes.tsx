import SearchByFilter from '~App/components/SearchRecipes/SearchByFilter';
import styles from './SearchRecipes.module.scss';
import SearchByTitle from '~App/components/SearchRecipes/SearchByTitle';
import { useSearchParams } from 'react-router';
import Button from '~components/Button';
import Text from '~components/Text';
import type { SearchRecipesProps } from './types';

const SearchRecipes: React.FC<SearchRecipesProps> = ({ totatItems }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const resetFilters = () => {
        searchParams.set('filterByCategoryId', '');
        searchParams.set('filterByName', '');
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    }
    return (
        <div className={styles.container}>
            <SearchByTitle />
            <div className={styles.filterandsort}>
                <SearchByFilter />
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
export default SearchRecipes;