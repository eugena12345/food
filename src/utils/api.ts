import type { ParamsFromQuery, ParamsForApi } from '~store/CatalogStore/types';
import { PAGE_SIZE } from '../store/CatalogStore//config';

export const createParamsForApi = (params: ParamsFromQuery): ParamsForApi => {
    const paramsForApi: ParamsForApi = {
        populate: ['images', 'category', 'ingradients'],
        pagination: {
            page: 1,
            pageSize: PAGE_SIZE,
        }
    };
    if (params.page) paramsForApi.pagination.page = params.page;
    if (params.filterByCategoryId && params.filterByCategoryId !== '') {
        if (paramsForApi.filters) {
            paramsForApi.filters.category = {
                id: { $in: [params.filterByCategoryId] }
            }
        } else {
            const filterByCategoryIdColl = params.filterByCategoryId.split(',');
            paramsForApi.filters = {
                category: {
                    id: { $in: filterByCategoryIdColl }
                }
            }
        }
    }

    if (params.filterByName && params.filterByName !== '') {
        if (paramsForApi.filters) {
            paramsForApi.filters.name = { $containsi: params.filterByName }
        } else {
            paramsForApi.filters = {
                name: {
                    $containsi: params.filterByName
                }
            }
        }
    };

    // if (params.sort && params.sort !== '') {
    //     paramsForApi.sort = params.sort;
    // }
    return paramsForApi;
};

export const createParamsForCategoriesApi = () => {
    const paramsForApi = {
        populate: ['image']
    };
    return paramsForApi;
}

//Написать типизацию
export const createCategoryParamsForApi = () => {
    const paramsForApi = {
        populate: ['image'],
    };
    return paramsForApi;
}
