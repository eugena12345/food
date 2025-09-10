import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api`;




const CatalogPage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                `${STRAPI_URL}/recipes`,
                {
                    headers: {
                        // API_TOKEN нужно получить в боте при выборе проекта
                        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                    },
                },
            );

            console.log('response', response);
            setRecipes(response.data.data);
        };

        fetch();
    }, []);

    return (
        <div>Основная страница

            <ul>
                {recipes.map(rec => (
                    <li key={rec.id}>
                        <Link to={`/users/${rec.id}`}>
                            {rec.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default CatalogPage;
