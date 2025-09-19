import { action, computed, makeObservable, observable, reaction, runInAction, type IReactionDisposer } from "mobx";
// import type { Recipe } from "~store/models/recepies";
import type { ParamsFromQuery } from "~store/CatalogStore";
import type { PrivateFields } from "~store/MealCategoryStore/types";
import { Meta, STRAPI_URL, metaInfoInitial } from "~store/CatalogStore";
import ApiStore, { HTTPMethod } from "~store/ApiStore";
import type { MealCategory } from "~store/models/recepies";
import type { CollectionModel } from '~store/models/shared/collection';
import {
    getInitialCollectionModel,
    normalizeCollection,
    linearizeCollection
} from '~store/models/shared/collection';
import { createCategoryParamsForApi } from "~utils/api";
// import rootStore from "~store/RootStore/instance";
// import { createParamsForApi } from "~utils/api";

export default class MealCategoryStore {
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _mealCategory: CollectionModel<number, MealCategory> = getInitialCollectionModel();
    //private _meta: Meta = Meta.initial;
    //private _metaInfo = metaInfoInitial;

    constructor() {
        makeObservable<MealCategoryStore, PrivateFields>(this, {
            _mealCategory: observable.ref, //Важно! реф позволяет сравнивать по ссылке
            //_meta: observable,
            //_metaInfo: observable,
            mealCategory: computed,
            //meta: computed,
            getMealCategoryList: action,
            reset: action,
        })
    }

    get mealCategory() {
        return linearizeCollection(this._mealCategory);
        //linearizeCollection(this._recepies);
    }

    // get meta() {
    //     return this._meta;
    // }

    // get metaInfo() {
    //     return this._metaInfo;
    // }

    async getMealCategoryList(
        // params: ParamsFromQuery
    ): Promise<void> {
        //this._meta = Meta.loading;
        this._mealCategory = getInitialCollectionModel();

        //const paramsForApi = createParamsForApi(params);

        const response = await this._apiStore.request<MealCategory[]>({
            method: HTTPMethod.GET,
            data: createCategoryParamsForApi(),
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
            endpoint: '/meal-categories',
        });
        console.log(response)
        runInAction(() => {
            if (response.success) {
                //this._meta = Meta.success;
                this._mealCategory = normalizeCollection(response.data, (el) => el.id);
                //this._metaInfo = response.meta;
                return;
            }
            //this._meta = Meta.error;
        })
    }

    reset(): void {
        this._mealCategory = getInitialCollectionModel();
        //this._meta = Meta.initial;
        //this._metaInfo = metaInfoInitial;
    }

    destroy(): void {
        this.reset();
        //  this._qpReactionPage();
        //  this._qpReactionName();
    }

    // private readonly _qpReactionPage: IReactionDisposer = reaction(
    //     () => rootStore.query.getParam('page'),
    //     () => {
    //         this.getRecipiesList(rootStore.query.getQueryParams())
    //     }
    // );
    // private readonly _qpReactionName: IReactionDisposer = reaction(
    //     () => rootStore.query.getParam('filterByName'),
    //     () => {
    //         console.log('!!!!!!!!!!!!!', rootStore.query.getParam('filterByName'))
    //         this.getRecipiesList(rootStore.query.getQueryParams())
    //     }
    // );

};

