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
import rootStore from "~store/RootStore/instance";
import type { Option } from "~App/components/MultiDropdown";
import CatalogFiltersStore from "~store/CatalogStore/CatalogFiltersStore/CatalogFiltersStore";

export default class MealCategoryStore {
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private readonly _catalogFiltersStore = new CatalogFiltersStore();

    private _mealCategory: CollectionModel<number, MealCategory> = getInitialCollectionModel();
    private _choosedCategory: Option[] = [];
    private _valueForMulti = '';

    constructor() {
        makeObservable<MealCategoryStore, PrivateFields>(this, {
            _mealCategory: observable.ref, //Важно! реф позволяет сравнивать по ссылке
            _choosedCategory: observable.ref,
            _valueForMulti: observable.ref,
            mealCategory: computed,
            choosedCategory: computed,
            valueForMulti: computed,
            getMealCategoryList: action,
            reset: action,
        })
    }

    get mealCategory() {
        return linearizeCollection(this._mealCategory);
    }

    get choosedCategory() {
        return this._choosedCategory;
    }
    get valueForMulti() {
        return this._valueForMulti;
    }

    getSelectedCategories(): void {
        const choosedCategoryId = rootStore.query.getParam('categories')?.toString().split(',') || [];
        const selectedCategories = this.mealCategory.filter((categ) =>
            choosedCategoryId.includes(categ.id.toString())
        );

        this._choosedCategory = selectedCategories.map((category) => ({
            key: category.id.toString(),
            value: category.title,
        }));
    }

    setSelectedCategories(value: Option[]): void {
        const createRecepiesMealCategoryColl = (value: Option[]): string[] => {
            const result: string[] = [];
            value.map((item) => result.push(item.key.toString()));
            return result;
        }
        this._catalogFiltersStore.setCategories(createRecepiesMealCategoryColl(value));
        this.getSelectedCategories();
    }


    updateValueForMulti() {
        this._valueForMulti = this.choosedCategory.map((category) => category.value).join(', ');
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
                this.getSelectedCategories();
                this.updateValueForMulti();
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

