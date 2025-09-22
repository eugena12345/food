import InfoCard from "~App/components/InfoCard";
import Button from "~components/Button";
import { useEffect } from "react";
import styles from './CatalogPage.module.scss'
import Loader from "~components/Loader";
import titleImage from '~assets/images/titleImage.png';
import overlayImage from '~assets/images/Recipes.svg'
import Pagination from "~App/components/Pagination";
import SearchInfo from "~App/components/SearchInfo";
import SearchRecipes from "~App/components/SearchRecipes";
import { getIngradientsString } from '~utils/helpers';
import { observer, useLocalObservable } from "mobx-react-lite";
import CatalogStore from "./../../../store/CatalogStore";
import { Meta } from "~store/CatalogStore/";
import rootStore from "~store/RootStore/instance";
import FavoriteStore from "~store/FavoriteStore/FavoriteStore";

const CatalogPage = observer(() => {
    const recipesStore = useLocalObservable(() => new CatalogStore());
    const favoriteStore = useLocalObservable(() => new FavoriteStore());

    useEffect(() => {
        recipesStore.getRecipiesList(rootStore.query.getQueryParams());
    }, []);

    return (
        <div>
            <div className={styles['titleImage-container']}>
                <img src={titleImage} alt='food' className={styles.titleImage} />
                <img src={overlayImage} alt="Overlay" className={styles.overlay} />
            </div>
            <div className={styles.container}>

                <div className={styles[`container--maxWidth`]}>
                    {recipesStore.meta === Meta.error && <div className={styles.error}>Возникла непредвиденная ошибка. Не удалось загрузить данные. Попробуйте позже.</div>}

                    <SearchInfo />
                    <SearchRecipes totatItems={recipesStore.recepies.length} />

                    {recipesStore.meta === Meta.loading && <Loader />}

                    <div className={styles[`container__products`]}>
                        {recipesStore.recepies.length > 0 && recipesStore.recepies.map(rec => {
                            return (
                                <InfoCard
                                    key={rec.id}
                                    image={rec.images[0].url}
                                    captionSlot={`${rec.cookingTime} minutes`}
                                    title={rec.name}
                                    subtitle={getIngradientsString(rec.ingradients || [])}
                                    itemDocumentId={rec.documentId}
                                    contentSlot={`${Math.round(rec.calories)} kcal`}
                                    actionSlot={
                                        <Button
                                            onClick={(e) => favoriteStore.addFavoriteRecipe(e, rec.id)}>
                                            Save
                                        </Button>
                                    }
                                />
                            )
                        }
                        )}
                    </div>
                    {recipesStore.metaInfo.pagination.pageCount > 1
                        && <Pagination pageCount={recipesStore.metaInfo.pagination.pageCount} actualPage={recipesStore.metaInfo.pagination.page} />}
                </div>
            </div>
        </div>
    )
});

export default CatalogPage;
