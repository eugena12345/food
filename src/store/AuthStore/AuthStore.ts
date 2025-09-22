import { action, computed, makeObservable, observable, runInAction } from "mobx";
import type { PrivateFields } from "~store/AuthStore";
import { STRAPI_URL } from "~store/CatalogStore";
//TODO import ApiStore, { HTTPMethod } from "~store/ApiStore";
//TODO import { createRecipeParamsForApi } from "~utils/api";
import axios from "axios";

export default class AuthStore {
    //TODO private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _identifier: string = '';
    private _email: string = '';
    private _password: string = '';
    private _repeatPassword: string = '';
    private _error: string | null = null;
    private _isLoading: boolean = false;
    private _isAuthenticated: boolean = !!localStorage.getItem('JWT');


    constructor() {
        makeObservable<AuthStore, PrivateFields>(this, {
            _identifier: observable,
            _email: observable,
            _password: observable,
            _repeatPassword: observable,
            _error: observable,
            _isLoading: observable,
            _isAuthenticated: observable,

            identifier: computed,
            email: computed,
            password: computed,
            repeatPassword: computed,
            error: computed,
            isLoading: computed,
            isAuthenticated: computed,

            authorize: action,
            register: action,
            logout: action,
            reset: action,
        })
    }
    get identifier() {
        return this._identifier;
    }

    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get repeatPassword() {
        return this._repeatPassword;
    }
    get error() {
        return this._error;
    }
    get isLoading() {
        return this._isLoading;
    }

    get isAuthenticated(): boolean {
        return this._isAuthenticated;;
    }

    setIdentifier(value: string) {
        this._identifier = value;
    }

    setEmail(value: string) {
        this._email = value;
    }

    setPassword(value: string) {
        this._password = value;
    }

    setRepeatPassword(value: string) {
        this._repeatPassword = value;
    }

    setError(message: string) {
        this._error = message;
    }

    setLoading(loading: boolean) {
        this._isLoading = loading;
    }

    async authorize(
    ): Promise<void> {

        this.setLoading(true);
        this.setError("");

        try {
            if (!this.identifier || !this.password) {
                throw new Error("Email and password are required");
            }
            const identifier = this._identifier;
            const password = this._password;
            const response = await axios.post(
                `${STRAPI_URL}/auth/local`,
                {
                    identifier,
                    password,
                }
            );
            runInAction(() => {
                if (response.status === 200) {
                    localStorage.setItem('username', this._identifier);
                    localStorage.setItem('JWT', response.data.jwt);
                    this._isAuthenticated = true;
                    return;
                }
            })

        } catch (error) {
            this.setError(error.message || "An error occurred during login");
        } finally {
            this.setLoading(false);
        }
    }

    async register(): Promise<void> {
        this.setLoading(true);
        this.setError("");
        try {
            if (!this.identifier || !this.password || !this.email) {
                throw new Error("Username, Email and password are required");
            }

            if (this._password !== this._repeatPassword) {
                throw new Error("Passwords must match");
            }

            const username = this._identifier;
            const email = this._email;
            const password = this._password;
            const response = await axios.post(
                `${STRAPI_URL}/auth/local/register`,
                {
                    username,
                    email,
                    password,
                }
            );

            runInAction(() => {
                if (response.status === 200) {
                    localStorage.setItem('username', this._identifier);
                    localStorage.setItem('JWT', response.data.jwt);
                    this._isAuthenticated = true;
                    return;
                }
            })
        } catch (error) {
            this.setError(error.message || "An error occurred during login");
        } finally {
            this.setLoading(false);
        }
    }

    logout(): void {
        localStorage.removeItem('JWT');
        localStorage.removeItem('username');
        this._isAuthenticated = false;
        this.reset();
    }

    reset(): void {
        this._email = '';
        this._password = '';
        this._repeatPassword = '';
        this._error = null;
        this._isLoading = false;
    }

    destroy(): void {
        this.reset();
    }
};

export const authStore = new AuthStore();
