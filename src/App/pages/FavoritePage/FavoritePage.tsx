import InfoCard from "~App/components/InfoCard";
import Button from "~components/Button";
import { useEffect, useState } from "react";
import styles from './FavoritePage.module.scss'
import Loader from "~components/Loader";
//TODO? import Pagination from "~App/components/Pagination";
//TODO? если есть import { getIngradientsString } from '~utils/helpers';
import { observer, useLocalObservable } from "mobx-react-lite";
import { Meta } from "~store/CatalogStore/";
import axios from "axios";
import FavoriteStore from "~store/FavoriteStore/FavoriteStore";
import { authStore } from "~store/AuthStore";
import { useNavigate } from "react-router";
import { routes } from "~config/routes.config";

const FavoritePage = observer(() => {
    const navigate = useNavigate();
    const favoriteStore = useLocalObservable(() => new FavoriteStore());
    const isAuthenticated = authStore.isAuthenticated;
    if (!isAuthenticated) {
        navigate(routes.login.create());
    }

    const deleteFavorite = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string): Promise<void> => {
        e.stopPropagation();
        const token = localStorage.getItem('JWT');
        try {
            const response = await axios.post(
                'https://front-school-strapi.ktsdev.ru/api/favorites/remove',
                { recipe: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                console.log(response)
                favoriteStore.getFavoriteRecipiesList();
            }
        } catch (error) {
            console.error('Error details:', error.response?.data);
            console.error('Status code:', error.response?.status);
        }
    }

    useEffect(() => {
        favoriteStore.getFavoriteRecipiesList();
    }, []);

    return (
        <div>
            <div className={styles.container}>

                <div className={styles[`container--maxWidth`]}>
                    {favoriteStore.meta === Meta.error && <div className={styles.error}>Возникла непредвиденная ошибка. Не удалось загрузить данные. Попробуйте позже.</div>}

                    {favoriteStore.meta === Meta.loading && <Loader />}

                    <div className={styles[`container__products`]}>
                        {favoriteStore.favoriteRecepies.length > 0 && favoriteStore.favoriteRecepies.map(rec => {
                            console.log('rec', rec)
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
                                        <Button onClick={(e) => deleteFavorite(e, rec.recipe.id)}>Delete</Button>
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
});

export default FavoritePage;
