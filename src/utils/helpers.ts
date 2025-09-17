import type { Ingredient } from 'App/pages/CatalogPage';
export const getNumberCountArr = (pageCount: number): number[] => {
    const result = [];
    for (let i = 1; i <= pageCount; i += 1) {
        result.push(i);
    }
    return result
};

export const getIngradientsString = (ingArr: Ingredient[]): string => {
    return ingArr.map((ing) => ing.name).join(' + ')
}


//TODO переместить в ДЗ 4
const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api`;
export const getURL = (recipeId: string | undefined): string => {
    if (!recipeId) return '';
    const queryParams = {
        populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category']
    };
    const queryString = qs.stringify(queryParams, { encodeValuesOnly: true });
    const fullUrl = `${STRAPI_URL}/recipes/${recipeId}?${queryString}`;
    return fullUrl;
}

