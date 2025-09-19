import { action, computed, makeObservable, observable, runInAction } from "mobx";
import type { Recipe } from "~store/models/recepies";
import type { RecipiesListParams, PrivateFields } from "~store/CatalogStore";
import { Meta, STRAPI_URL, metaInfoInitial } from "~store/CatalogStore";
import ApiStore, { HTTPMethod } from "~store/ApiStore";
import type { CollectionModel } from '~store/models/shared/collection';
import {
    getInitialCollectionModel,
    normalizeCollection,
    linearizeCollection
} from '~store/models/shared/collection';

export default class CatalogStore {
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _recepies: CollectionModel<number, Recipe> = getInitialCollectionModel();
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
        //console.log(this._recepies)
        return linearizeCollection(this._recepies);
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
        this._recepies = getInitialCollectionModel();

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
                this._recepies = normalizeCollection(response.data, (el) => el.id);
                this._metaInfo = response.meta;
                return;
            }


            this._meta = Meta.error;
        })
    }

    reset(): void {
        this._recepies = getInitialCollectionModel();
        this._meta = Meta.initial;
        this._metaInfo = metaInfoInitial;
    }

    destroy(): void {
        this.reset();
    }
};

