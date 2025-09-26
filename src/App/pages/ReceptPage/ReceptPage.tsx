import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Loader from '~components/Loader';
import Text from '~components/Text';
import IngredientsEquipmentBlock from '~App/pages/ReceptPage/IngredientsEquipmentBlock';
import decorativeImage from '~assets/images/Pattern.png';
import styles from './ReceptPage.module.scss'
import { observer } from 'mobx-react-lite';
import RecipeStore from '~store/RecipeStore';
import { useLocalStore } from '~utils/useLocalStore';

const ReceptPage = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const recipeStore = useLocalStore(() => new RecipeStore());

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                await recipeStore.getRecipe(params?.id || '');
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
                {recipeStore.recipe?.name
                    && <div className={styles.recipe}>
                        <div className={styles.title}>
                            {/*TODO картиника вернуться назад */}
                            <Text view='title'>{recipeStore.recipe.name}</Text>
                        </div>


                        <div className={styles.preInfo}>
                            <img src={recipeStore.recipe.images[0].url} alt='картинка' className={styles['card__image']} />
                            <div className={styles.info}>
                                <div className={styles.descrElement}>
                                    <Text>Preparation</Text>
                                    <Text weight='bold' color='accent'>{recipeStore.recipe.preparationTime} minutes</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Cooking</Text>
                                    <Text weight='bold' color='accent'>{recipeStore.recipe.cookingTime} minutes</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Total</Text>
                                    <Text weight='bold' color='accent'>{recipeStore.recipe.preparationTime + recipeStore.recipe.cookingTime} minutes</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Likes</Text>
                                    <Text weight='bold' color='accent'>{recipeStore.recipe.likes}</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Servings</Text>
                                    <Text weight='bold' color='accent'>{recipeStore.recipe.servings} servings</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Ratings</Text>
                                    <Text weight='bold' color='accent'>{recipeStore.recipe.rating}/5</Text>
                                </div>
                            </div>
                        </div>

                        <div className={styles.summary}>
                            <div dangerouslySetInnerHTML={{ __html: recipeStore.recipe.summary }} ></div>
                        </div>

                        <div className={styles.need}>
                            <IngredientsEquipmentBlock
                                ingredients={recipeStore.recipe.ingradients}
                                equipment={recipeStore.recipe.equipments}
                            />
                        </div>

                        <div className={styles.description}>
                            <Text tag='h2'>Directions</Text>
                            {recipeStore.recipe.directions?.map((step, idx) => {
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

export default observer(ReceptPage);