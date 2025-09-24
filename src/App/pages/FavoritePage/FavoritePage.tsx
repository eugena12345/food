import InfoCard from "~App/components/InfoCard";
import Button from "~components/Button";
import { useEffect } from "react";
import styles from './FavoritePage.module.scss'
import Loader from "~components/Loader";
//TODO? import Pagination from "~App/components/Pagination";
//TODO? если есть import { getIngradientsString } from '~utils/helpers';
import { observer, useLocalObservable } from "mobx-react-lite";
import { Meta } from "~store/CatalogStore/";
import FavoriteStore from "~store/FavoriteStore";
import { authStore } from "~store/AuthStore";
import { useNavigate } from "react-router";
import { routes } from "~config/routes.config";
import Text from "~components/Text";

const FavoritePage = () => {
    const navigate = useNavigate();
    const favoriteStore = useLocalObservable(() => new FavoriteStore());
    const isAuthenticated = authStore.isAuthenticated;
    if (!isAuthenticated) {
        navigate(routes.login.create());
    }

    useEffect(() => {
        favoriteStore.getFavoriteRecipiesList();
    }, []);

    return (
        <div>
            <div className={styles.container}>
                <Text tag="h1" color="accent">Favorite recipes</Text>
                <div className={styles[`container--maxWidth`]}>
                    {favoriteStore.meta === Meta.error && <div className={styles.error}>Возникла непредвиденная ошибка. Не удалось загрузить данные. Попробуйте позже.</div>}

                    {favoriteStore.meta === Meta.loading && <Loader />}

                    <div className={styles[`container__products`]}>
                        {favoriteStore.favoriteRecepies.length > 0 && favoriteStore.favoriteRecepies.map(rec => {
                            return (
                                <InfoCard
                                    key={rec.recipe.id}
                                    image={rec.recipe.images[0].url}
                                    captionSlot={`${rec.recipe.cookingTime} minutes`}
                                    title={rec.recipe.name}
                                    subtitle=''// НЕТ ИНГРЕДИЕНТОВ в ответе!!!  {getIngradientsString(rec.ingradients)}
                                    itemDocumentId={rec.recipe.documentId}
                                    contentSlot={`${Math.round(rec.recipe.calories)} kcal`}
                                    actionSlot={
                                        <Button onClick={(e) => favoriteStore.deleteFavoriteRecipe(e, rec.recipe.id)}>Delete</Button>
                                    }
                                />
                            )
                        }
                        )}
                    </div>
                    {/*TODO {favoriteStore.favoriteRecepies.length / PAGE_SIZE > 1
                        && <Pagination pageCount={favoriteStore.favoriteRecepies.length / PAGE_SIZE} actualPage={1} />} */}
                </div>
            </div>
        </div>
    )
};

export default observer(FavoritePage);
