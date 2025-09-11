import InfoCard from "App/components/InfoCard";
import axios from "axios";
import Button from "components/Button";
import { useEffect, useState } from "react";
import styles from './CatalogPage.module.scss'
import Loader from "components/Loader";
import titleImage from 'assets/images/titleImage.png';
import overlayImage from 'assets/images/Recipes (1) 1.svg'

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api`;
const getIngradientsString = (ingArr) => {
    return ingArr.map((ing) => ing.name).join(' + ')
}




const CatalogPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                //использовать библиотеку qs
                `${STRAPI_URL}/recipes?populate[0]=images&populate[1]=ingradients`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                    },
                },
            );
            setRecipes(response.data.data);
            console.log(response.data.data)
            setIsLoading(false)
        };
        setIsLoading(true)
        fetch();
    }, []);

    return (
        <div>
            <div className={styles['titleImage-container']}>
                <img src={titleImage} alt='food' className={styles.titleImage} />
                <img src={overlayImage} alt="Overlay" className={styles.overlay} />
            </div>
            {/* добвить стили картинке ^^ */}
            <div className={styles.container}>

                <div className={styles[`container--maxWidth`]}>
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
                </div>
            </div>

        </div>


    )
};

export default CatalogPage;
