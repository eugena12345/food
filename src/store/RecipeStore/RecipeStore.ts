import { action, computed, makeObservable, observable, runInAction } from "mobx";
import type { Recipe } from "~store/models/recepies";
import type { PrivateFields } from "~store/RecipeStore";
import { STRAPI_URL } from "~store/CatalogStore";
import ApiStore, { HTTPMethod } from "~store/ApiStore";
import { createRecipeParamsForApi } from "~utils/api";

export default class RecipeStore {
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _recipe: Recipe | null = null;

    constructor() {
        makeObservable<RecipeStore, PrivateFields>(this, {
            _recipe: observable.ref, //Важно! реф позволяет сравнивать по ссылке
            recipe: computed,
            getRecipe: action,
            reset: action,
        })
    }

    get recipe() {
        return this._recipe;
    }

    async getRecipe(
        recipeId: string
    ): Promise<void> {
        this._recipe = null;

        const paramsForApi = createRecipeParamsForApi();

        const response = await this._apiStore.request<Recipe>({
            method: HTTPMethod.GET,
            data: paramsForApi,
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
            endpoint: `/recipes/${recipeId}`,
        });

        runInAction(() => {
            if (response.success) {
                this._recipe = response.data;
                return;
            }
        })
    }

    reset(): void {
        this._recipe = null;
    }

    destroy(): void {
        this.reset();
    }
};

