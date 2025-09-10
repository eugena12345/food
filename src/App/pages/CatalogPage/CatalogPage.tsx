import InfoCard from "App/components/InfoCard";
import axios from "axios";
import Button from "components/Button";
import { routes } from "config/routes.config";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api`;
const getIngradientsString = (ingArr) => {
    return ingArr.map((ing) => ing.name).join(' + ')
}




const CatalogPage = () => {
    const [recipes, setRecipes] = useState([]);

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
        };

        fetch();
    }, []);

    return (
        <div>Основная страница

            <ul>
                {recipes.map(rec => (
                    <li key={rec.id}>
                        <Link to={routes.recipe.create(rec.documentId)}>
                            <InfoCard
                                image={rec.images[0].url}
                                captionSlot={`${rec.cookingTime} minutes`}
                                title={rec.name}
                                subtitle={getIngradientsString(rec.ingradients)}
                                itemDocumentId={rec.documentId}
                                contentSlot={`${Math.round(rec.calories)} kcal`}
                                actionSlot={
                                    <Button>Save</Button>
                                }

                            //onClick?: React.MouseEventHandler;
                            />


                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default CatalogPage;
