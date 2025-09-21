import { action, computed, makeObservable, observable, runInAction } from "mobx";
import type { Recipe } from "~store/models/recepies";
import type { PrivateFields } from "~store/FavoriteStore";
import { Meta, STRAPI_URL } from "~store/CatalogStore";
//TODO import ApiStore, { HTTPMethod } from "~store/ApiStore";
import type { CollectionModel } from '~store/models/shared/collection';
import {
    getInitialCollectionModel,
    normalizeCollection,
    linearizeCollection
} from '~store/models/shared/collection';
import axios from "axios";

export default class FavoriteStore {
    //TODO? private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _favoriteRecepies: CollectionModel<number, Recipe> = getInitialCollectionModel();
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<FavoriteStore, PrivateFields>(this, {
            _favoriteRecepies: observable.ref, //Важно! реф позволяет сравнивать по ссылке
            _meta: observable,
            favoriteRecepies: computed,
            meta: computed,
            getFavoriteRecipiesList: action,
            reset: action,
        })
    }

    get favoriteRecepies() {
        return linearizeCollection(this._favoriteRecepies);
    }

    get meta() {
        return this._meta;
    }

    async getFavoriteRecipiesList(
    ): Promise<void> {
        this._meta = Meta.loading;
        this._favoriteRecepies = getInitialCollectionModel();

        const token = localStorage.getItem('JWT')
        const response = await axios.get(
            `${STRAPI_URL}/favorites`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        runInAction(() => {
            if (response.status === 200) {
                this._favoriteRecepies = normalizeCollection(response.data, (el) => el.id);
                this._meta = Meta.success;
                return;
            } else {
                this._meta = Meta.error;
            }
        })

    }

    reset(): void {
        this._favoriteRecepies = getInitialCollectionModel();
        this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }
};

