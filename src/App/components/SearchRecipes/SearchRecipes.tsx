import SearchByFilter from '~App/components/SearchRecipes/SearchByFilter';
import styles from './SearchRecipes.module.scss';
import SearchByTitle from '~App/components/SearchRecipes/SearchByTitle';
import { useSearchParams } from 'react-router';
import Button from '~components/Button';
//import Text from 'components/Text';

const SearchRecipes = () => {
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
            {/* TODO <div className={styles.container__resultOrReset}>
                <div className={styles['container__result']}>
                        <>
                            <Text tag='h2' color='primary'>Total Recipes</Text>
                            <Text view='p-20' color='accent' weight='bold'>__ Recipes</Text>
                        </>
                    
                </div>
            </div> */}
            <Button onClick={resetFilters}>Reset filters</Button>
        </div>
    );

}
export default SearchRecipes;