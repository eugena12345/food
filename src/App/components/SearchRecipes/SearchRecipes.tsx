import SearchByFilter from 'App/components/SearchRecipes/SearchByFilter';
import styles from './SearchRecipes.module.scss';
import SearchByTitle from 'App/components/SearchRecipes/SearchByTitle';
//import Text from 'components/Text';

const SearchRecipes = () => {
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
        </div>
    );

}
export default SearchRecipes;