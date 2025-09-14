import InfoCard from "App/components/InfoCard";
import axios from "axios";
import Button from "components/Button";
import { useEffect, useState } from "react";
import styles from './CatalogPage.module.scss'
import Loader from "components/Loader";
import titleImage from 'assets/images/titleImage.png';
import overlayImage from 'assets/images/Recipes (1) 1.svg'
import Pagination from "App/components/Pagination";
//import Text from "components/Text";
//import ProductsInfo from "App";
import SearchInfo from "App/components/SearchInfo";
import SearchRecipes from "App/components/SearchRecipes";
import qs from 'qs';
import { useSearchParams } from "react-router";

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api`;
const getIngradientsString = (ingArr: Ingredient[]): string => {
    return ingArr.map((ing) => ing.name).join(' + ')
}


export interface Image {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    url: string
}

export interface Ingredient {
    id: number;
    name: string;
    amount: number;
    unit: string | null;
}

export type Equipment = {
    id: number,
    name: string
}

export type Direction = {
    description: string,
    id: number,
    image: null | string
}

export interface Recipe {
    calories: number;
    cookingTime: number;
    createdAt: string;
    documentId: string;
    id: number;
    images: Image[];
    ingradients: Ingredient[];
    likes: number;
    name: string;
    preparationTime: number;
    publishedAt: string;
    rating: number;
    servings: number;
    summary: string;
    totalTime: number;
    updatedAt: string;
    vegetarian: boolean;
    equipments?: Equipment[];
    directions?: Direction[];
}

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




    useEffect(() => {
        const page = Number(searchParams.get('page')) || 1;
        const url = getURL(page);
        console.log(url)
        console.log(`${STRAPI_URL}/recipes?populate[0]=images&populate[1]=ingradients`)
        const fetch = async () => {
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
            //console.log(response.data.data)
            //console.log(response.data.meta.pagination.pageCount)
            // console.log(response.data.meta.pagination.page)

            setIsLoading(false)
        };
        setIsLoading(true)
        fetch();
    }, [searchParams]);

    useEffect(() => {
        console.log('ap', searchParams.get('page'))
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
