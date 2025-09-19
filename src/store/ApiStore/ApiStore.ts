import { stringify } from 'qs';
import { HTTPMethod, StatusHTTP, } from './types';
import type { ApiResponse, IApiStore, RequestParams, } from './types';


// TODO переписать с использованием axios
export default class ApiStore implements IApiStore {
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private _getRequestData<ReqT>(params: RequestParams<ReqT>): [RequestInfo, RequestInit] {
        let endpoint: RequestInfo = `${this.baseUrl}${params.endpoint}`;
        const options: RequestInit = {
            method: params.method,
            headers: { ...params.headers },
        };

        if (params.method === HTTPMethod.GET) {
            endpoint = `${endpoint}?${stringify(params.data)}`;
        }

        if (params.method === HTTPMethod.POST) {
            options.headers = {
                ...options.headers,
                "Content-Type": "application/json;charset=utf-8",
            };
            options.body = JSON.stringify(params.data);
        }
        console.log('endpoint, options', endpoint, options)

        return [endpoint, options];
    }

    async request<SuccessT, ErrorT = unknown, ReqT = Record<string, unknown>>(
        params: RequestParams<ReqT>
    ): Promise<ApiResponse<SuccessT, ErrorT>> {
        try {
            const response = await fetch(...this._getRequestData(params));
            const data = await response.json();

            return {
                success: response.ok,
                data: data.data,
                meta: data.meta,
                status: response.status,
            };
        } catch (e) {
            return {
                success: false,
                data: null,
                status: StatusHTTP.UNEXPECTED_ERROR,
            };
        }
    }
}