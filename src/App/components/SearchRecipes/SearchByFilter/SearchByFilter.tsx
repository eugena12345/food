import MultiDropdown, { type Option } from "~App/components/MultiDropdown";
import styles from './SearchByFilter.module.scss';
import MealCategoryStore from "~store/MealCategoryStore/MealCategoryStore";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { useLocalStore } from "~utils/useLocalStore";

const SearchByFilter = () => {
    const mealCategoryStore = useLocalStore(() => new MealCategoryStore());

    useEffect(() => {
        const getCategory = async () => {
            await mealCategoryStore.getMealCategoryList();
        };

        getCategory();
    }, [mealCategoryStore]);

    const getOptions = useCallback((): Option[] => {
        if (mealCategoryStore.mealCategory.length > 0) {
            return mealCategoryStore.mealCategory.map((category) => ({ key: category.id.toString(), value: category.title }))
        }
        return []
    }, []);

    const optionsForMulti = getOptions();

    const getTitle = useCallback((elements: Option[]) =>
        elements.map((el: Option) => el.value).join(', '), []);

    const onChange = useCallback((value: Option[]) => {
        mealCategoryStore.setSelectedCategories(value);
    }, []);

    return (
        <MultiDropdown
            options={optionsForMulti}
            value={mealCategoryStore.choosedCategory}
            onChange={onChange}
            getTitle={getTitle}
            className={styles['container__filter']}
        />
    )
};

export default observer(SearchByFilter);