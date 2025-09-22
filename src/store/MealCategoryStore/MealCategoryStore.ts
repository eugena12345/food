import { action, computed, makeObservable, observable, runInAction } from "mobx";
import type { PrivateFields } from "~store/MealCategoryStore/types";
import { STRAPI_URL } from "~store/CatalogStore";
import ApiStore, { HTTPMethod } from "~store/ApiStore";
import type { MealCategory } from "~store/models/recepies";
import type { CollectionModel } from '~store/models/shared/collection';
import {
    getInitialCollectionModel,
    normalizeCollection,
    linearizeCollection
} from '~store/models/shared/collection';
import { createCategoryParamsForApi } from "~utils/api";

export default class MealCategoryStore {
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _mealCategory: CollectionModel<number, MealCategory> = getInitialCollectionModel();

    constructor() {
        makeObservable<MealCategoryStore, PrivateFields>(this, {
            _mealCategory: observable.ref, //Важно! реф позволяет сравнивать по ссылке
            mealCategory: computed,
            getMealCategoryList: action,
            reset: action,
        })
    }

    get mealCategory() {
        return linearizeCollection(this._mealCategory);
    }

    async getMealCategoryList(
    ): Promise<void> {
        this._mealCategory = getInitialCollectionModel();

        const response = await this._apiStore.request<MealCategory[]>({
            method: HTTPMethod.GET,
            data: createCategoryParamsForApi(),
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
            endpoint: '/meal-categories',
        });
        runInAction(() => {
            if (response.success) {
                this._mealCategory = normalizeCollection(response.data, (el) => el.id);
                return;
            }
        })
    }

    reset(): void {
        this._mealCategory = getInitialCollectionModel();
    }

    destroy(): void {
        this.reset();
    }
};

