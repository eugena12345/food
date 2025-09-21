import React, { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import styles from "./MealCategoriesPage.module.scss";
import MealCategoryStore from "~store/MealCategoryStore/MealCategoryStore";
import Text from "~components/Text";
import Loader from "~components/Loader";
import { useNavigate } from "react-router";
import { routes } from "~config/routes.config";

const MealCategoriesPage = observer(() => {
    const mealCategoryStore = useLocalObservable(() => new MealCategoryStore());
    const navigate = useNavigate();

    // Загрузка данных при монтировании ???
    useEffect(() => {
        mealCategoryStore.getMealCategoryList();
        return () => {
            mealCategoryStore.reset(); // Очистка данных при размонтировании ???
        };
    }, []);

    const goToFiltredCategory = (categoryId: string) => {
        navigate(routes.mainWithCategory.create(categoryId))
    }

    return (
        <div className={styles.container}>

            <div className={styles.withMaxWidth}>

                <Text color="accent" tag="h3">Meals Categories</Text>
                {mealCategoryStore.mealCategory.length === 0 ? (
                    <Loader />
                ) : (
                    <div className={styles.grid}>
                        {mealCategoryStore.mealCategory.map((category) => (
                            <div key={category.id} className={styles.card} onClick={() => goToFiltredCategory(category.id)}>
                                <img
                                    src={category.image.url}
                                    alt={category.title}
                                    className={styles.image}
                                />
                                <h3 className={styles.title}>{category.title}</h3>
                            </div>
                        )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});

export default MealCategoriesPage;