import { useParams } from 'react-router';
import styles from './ReceptPage.module.scss'
import { useEffect, useState } from 'react';
import Loader from 'components/Loader';
import axios from 'axios';
import Text from 'components/Text';
import IngredientsEquipmentBlock from 'App/pages/ReceptPage/IngredientsEquipmentBlock';
import decorativeImage from './../../../assets/images/Pattern.png';
import type { Recipe } from 'App/pages/CatalogPage';
import { getURL } from 'utils/helpers';

const ReceptPage = () => {
    const params = useParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                const url = getURL(params.id);
                const response = await axios.get(
                    url,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                        },
                    },
                );
                setRecipe(response.data.data);
                setIsLoading(false)
                setError(null);
            } catch (err) {
                console.error('Ошибка при выполнении запроса:', error);
                setIsLoading(false);
                setError('Не удалось загрузить данные. Попробуйте позже.');

            }
        };
        setIsLoading(true)
        fetch();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.decorativeImage} style={{ backgroundImage: `url(${decorativeImage})` }}></div>
            <div className={styles[`container--maxWidth`]}>
                {error && <div className={styles.error}>{error}</div>}

                {isLoading && <div className={styles.center}><Loader /></div>}
                {recipe?.name
                    && <div className={styles.recipe}>
                        <div className={styles.title}>
                            {/*TODO картиника вернуться назад */}
                            <Text view='title'>{recipe.name}</Text>
                        </div>


                        <div className={styles.preInfo}>
                            <img src={recipe.images[0].url} alt='картинка' className={styles['card__image']} />
                            <div className={styles.info}>
                                <div className={styles.descrElement}>
                                    <Text>Preparation</Text>
                                    <Text weight='bold' color='accent'>{recipe.preparationTime} minutes</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Cooking</Text>
                                    <Text weight='bold' color='accent'>{recipe.cookingTime} minutes</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Total</Text>
                                    <Text weight='bold' color='accent'>{recipe.preparationTime + recipe.cookingTime} minutes</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Likes</Text>
                                    <Text weight='bold' color='accent'>{recipe.likes}</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Servings</Text>
                                    <Text weight='bold' color='accent'>{recipe.servings} servings</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Ratings</Text>
                                    <Text weight='bold' color='accent'>{recipe.rating}/5</Text>
                                </div>
                            </div>
                        </div>

                        <div className={styles.summary}>
                            <div dangerouslySetInnerHTML={{ __html: recipe.summary }} ></div>
                        </div>

                        <div className={styles.need}>
                            <IngredientsEquipmentBlock
                                ingredients={recipe.ingradients}
                                equipment={recipe.equipments}
                            />
                        </div>

                        <div className={styles.description}>
                            <Text tag='h2'>Directions</Text>
                            {recipe.directions?.map((step, idx) => {
                                return (
                                    <div key={step.id} className={styles.steps}>
                                        <Text tag='h3'>Step {idx + 1}</Text>
                                        <div>{step.description}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
};

export default ReceptPage;