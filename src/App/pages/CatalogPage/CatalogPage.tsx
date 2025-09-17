import InfoCard from "~App/components/InfoCard";
import axios from "axios";
import Button from "~components/Button";
import { useEffect, useState } from "react";
import styles from './CatalogPage.module.scss'
import Loader from "~components/Loader";
import titleImage from '~assets/images/titleImage.png';
import overlayImage from '~assets/images/Recipes (1) 1.svg'
import Pagination from "~App/components/Pagination";
import SearchInfo from "~App/components/SearchInfo";
import SearchRecipes from "~App/components/SearchRecipes";
import qs from 'qs';
import { useSearchParams } from "react-router";
import type { Recipe } from './types';
import { getIngradientsString } from '~utils/helpers';

//TODO переместить в ДЗ 4
const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api`;

const getURL = (actualPage: number): string => {
    const queryParams = {
        populate: ['images', 'ingradients'],
        pagination: {
            page: actualPage,
            pageSize: 6,
        }
    };
    const queryString = qs.stringify(queryParams, { encodeValuesOnly: true });
    const fullUrl = `${STRAPI_URL}/recipes?${queryString}`;
    return fullUrl;
}

const CatalogPage = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageCount, setPageCount] = useState<number>(1);
    const [actualPage, setActualPage] = useState<number>(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const page = Number(searchParams.get('page')) || 1;
        const url = getURL(page);
        const fetch = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    url,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                        },
                    },
                );
                setRecipes(response.data.data);
                setPageCount(response.data.meta.pagination.pageCount);
                setActualPage(response.data.meta.pagination.page)
                setIsLoading(false);
                setError(null);

            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
                setIsLoading(false);
                setError('Не удалось загрузить данные. Попробуйте позже.');
            }

        };
        fetch();
    }, [searchParams]);

    useEffect(() => {
        setActualPage(Number(searchParams.get('page')) || 1);
    }, [searchParams]);

    return (
        <div>
            <div className={styles['titleImage-container']}>
                <img src={titleImage} alt='food' className={styles.titleImage} />
                <img src={overlayImage} alt="Overlay" className={styles.overlay} />
            </div>
            <div className={styles.container}>

                <div className={styles[`container--maxWidth`]}>
                    {error && <div className={styles.error}>{error}</div>}

                    <SearchInfo />
                    <SearchRecipes />

                    {isLoading && <Loader />}

                    <div className={styles[`container__products`]}>
                        {recipes.map(rec => (

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
                        ))}
                    </div>
                    {pageCount > 1
                        && <Pagination pageCount={pageCount} actualPage={actualPage} />}
                </div>
            </div>

        </div>


    )
};

export default CatalogPage;
