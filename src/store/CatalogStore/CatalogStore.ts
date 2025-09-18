import { action, computed, makeObservable, observable, runInAction } from "mobx";
import type { Recipe } from "~store/models/recepies";
import type { RecipiesListParams, PrivateFields } from "~store/CatalogStore";
import { Meta, STRAPI_URL, metaInfoInitial } from "~store/CatalogStore";
import ApiStore, { HTTPMethod } from "~store/ApiStore";

export default class CatalogStore {
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _recepies: Recipe[] = [];
    private _meta: Meta = Meta.initial;
    private _metaInfo = metaInfoInitial;

    constructor() {
        makeObservable<CatalogStore, PrivateFields>(this, {
            _recepies: observable.ref, //Важно! реф позволяет сравнивать по ссылке
            _meta: observable,
            _metaInfo: observable,
            recepies: computed,
            meta: computed,
            getRecipiesList: action,
            reset: action,
        })
    }

    get recepies() {
        console.log(this._recepies)
        return this._recepies;
    }

    get meta() {
        return this._meta;
    }

    get metaInfo() {
        return this._metaInfo;
    }

    async getRecipiesList(
        params: RecipiesListParams
    ): Promise<void> {
        this._meta = Meta.loading;
        this._recepies = [];

        const response = await this._apiStore.request<Recipe[]>({
            method: HTTPMethod.GET,
            data: params,
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
            endpoint: '/recipes',
        });
        runInAction(() => {
            if (response.success) {
                this._meta = Meta.success;
                this._recepies = response.data;
                this._metaInfo = response.meta;
                return;
            }


            this._meta = Meta.error;
        })
    }

    reset(): void {
        this._recepies = [];
        this._meta = Meta.initial;
        this._metaInfo = metaInfoInitial;
    }

    destroy(): void {
        this.reset();
    }
};

