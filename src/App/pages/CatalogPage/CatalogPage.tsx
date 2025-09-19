import InfoCard from "~App/components/InfoCard";
import Button from "~components/Button";
import { useEffect } from "react"; //, useState
import styles from './CatalogPage.module.scss'
import Loader from "~components/Loader";
import titleImage from '~assets/images/titleImage.png';
import overlayImage from '~assets/images/Recipes.svg'
import Pagination from "~App/components/Pagination";
import SearchInfo from "~App/components/SearchInfo";
import SearchRecipes from "~App/components/SearchRecipes";
//import { useSearchParams } from "react-router";
import { getIngradientsString } from '~utils/helpers';
import { observer, useLocalObservable, useLocalStore } from "mobx-react-lite";
import CatalogStore from "./../../../store/CatalogStore";
import { Meta } from "~store/CatalogStore/";
import rootStore from "~store/RootStore/instance";

const CatalogPage = observer(() => {
    //const [searchParams, setSearchParams] = useSearchParams();

    const recipesStore = useLocalObservable(() => new CatalogStore());

    useEffect(() => {
        // const queryParams = {
        //     populate: ['images', 'ingradients'],
        //     pagination: {
        //         page: Number(searchParams.get('page')) || 1,
        //         pageSize: 6,
        //     }
        // };
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
                    {/*TODO есть ли сообщение с сервера? {error} */}

                    <SearchInfo />
                    <SearchRecipes />

                    {recipesStore.meta === Meta.loading && <Loader />}

                    <div className={styles[`container__products`]}>
                        {recipesStore.recepies.length > 0 && recipesStore.recepies.map(rec => {
                            //console.log(' recept 1; ', rec);
                            return (

                                <InfoCard
                                    key={rec.id}
                                    image={rec.images[0].url}
                                    captionSlot={`${rec.cookingTime} minutes`}
                                    title={rec.name}
                                    subtitle={getIngradientsString(rec.ingradients)}
                                    itemDocumentId={rec.documentId}
                                    contentSlot={`${Math.round(rec.calories)} kcal`}
                                    actionSlot={
                                        <Button>Save</Button>
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
