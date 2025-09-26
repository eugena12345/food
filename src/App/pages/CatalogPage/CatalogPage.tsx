import InfoCard from "~App/components/InfoCard";
import Button from "~components/Button";
import { useCallback, useEffect } from "react";
import styles from './CatalogPage.module.scss'
import Loader from "~components/Loader";
import titleImage from '~assets/images/titleImage.png';
import overlayImage from '~assets/images/Recipes.svg'
import Pagination from "~App/components/Pagination";
import SearchInfo from "~App/components/SearchInfo";
import CatalogFilters from "~App/components/CatalogFilters";
import { getIngradientsString } from '~utils/helpers';
import { observer } from "mobx-react-lite";
import CatalogStore from "~store/CatalogStore";
import { Meta } from "~store/CatalogStore/";
import rootStore from "~store/RootStore/instance";
import FavoriteStore from "~store/FavoriteStore";
import { useLocalStore } from "~utils/useLocalStore";
import Text from "~components/Text";

const CatalogPage = () => {
    const catalogStore = useLocalStore(() => new CatalogStore());
    const favoriteStore = useLocalStore(() => new FavoriteStore());

    const addFavRecipe = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, recipeId: number) => {
            favoriteStore.addFavoriteRecipe(e, recipeId);
        }, [favoriteStore])

    useEffect(() => {
        catalogStore.getRecipiesList(rootStore.query.getQueryParams());
    }, []);

    return (
        <div>
            <div className={styles['titleImage-container']}>
                <img src={titleImage} alt='food' className={styles.titleImage} />
                <img src={overlayImage} alt="Overlay" className={styles.overlay} />
            </div>
            <div className={styles.container}>

                <div className={styles[`container--maxWidth`]}>
                    {catalogStore.meta === Meta.error && <div className={styles.error}>Возникла непредвиденная ошибка. Не удалось загрузить данные. Попробуйте позже.</div>}

                    <SearchInfo />
                    <CatalogFilters totatItems={catalogStore.recepies.length} />

                    {catalogStore.meta === Meta.loading && <Loader />}
                    {
                        catalogStore.meta === Meta.success && catalogStore.recepies.length === 0
                        && <Text tag="h3">Nothing found matching your criteria. Try changing your filters.</Text>
                    }

                    <div className={styles[`container__products`]}>
                        {catalogStore.recepies.length > 0 && catalogStore.recepies.map(rec => {
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
                                            onClick={(e) => addFavRecipe(e, rec.id)}>
                                            Save
                                        </Button>
                                    }
                                />
                            )
                        }
                        )}
                    </div>
                    {catalogStore.metaInfo.pagination.pageCount > 1
                        && <Pagination pageCount={catalogStore.metaInfo.pagination.pageCount} actualPage={catalogStore.metaInfo.pagination.page} />}
                </div>
            </div>
        </div>
    )
};

export default observer(CatalogPage);
