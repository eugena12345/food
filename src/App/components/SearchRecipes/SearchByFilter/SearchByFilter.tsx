import MultiDropdown, { type Option } from "~App/components/MultiDropdown";
import styles from './SearchByFilter.module.scss';
import MealCategoryStore from "~store/MealCategoryStore/MealCategoryStore";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";


const SearchByFilter = observer(() => {
    const [value, setValue] = useState<Option[]>([]);
    const [searchParams, setSearchParams] = useSearchParams()
    const mealCategoryStore = useLocalObservable(() => new MealCategoryStore());

    useEffect(() => {
        const getCategory = async () => {
            await mealCategoryStore.getMealCategoryList();
            if (mealCategoryStore.mealCategory.length > 0) {
                const choosedCategoryId = searchParams.get('filterByCategoryId')?.split(',');
                console.log('choosedCategory', choosedCategoryId);
                const oldValues = mealCategoryStore.mealCategory.filter((categ) => choosedCategoryId?.includes(categ.id.toString()));
                console.log('oldValues MULTI', oldValues)
                setValue(oldValues.map((category) => ({ key: category.id.toString(), value: category.title })))
            }
        };

        getCategory()


    }, []);

    //console.log('mealCategory from component', mealCategoryStore.mealCategory)
    const getOptions = (): Option[] => {
        if (mealCategoryStore.mealCategory.length > 0) {
            return mealCategoryStore.mealCategory.map((category) => ({ key: category.id.toString(), value: category.title }))
        }
        return []
    }
    const optionsForMulti = getOptions();


    const getTitle = (elements: Option[]) =>
        elements.map((el: Option) => el.value).join(', ');


    const onChange = (value: Option[]) => {
        setValue(value);

        const createRecepiesMealCategoryColl = () => {
            const result: string[] = [];
            value.map((item) => result.push(item.key.toString()))
            return result;
        }
        searchParams.set('filterByCategoryId', createRecepiesMealCategoryColl().join(','));
        searchParams.set('page', '1');
        setSearchParams(searchParams);

    };


    return (
        <MultiDropdown
            options={optionsForMulti}
            value={value}
            onChange={onChange}
            getTitle={getTitle}
            className={styles['container__filter']}
        />
    )
});

export default SearchByFilter;