import axios, { type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';
import { HTTPMethod, StatusHTTP } from './types';
import type { ApiResponse, IApiStore, RequestParams } from './types';

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private _getRequestData<ReqT>(params: RequestParams<ReqT>): AxiosRequestConfig {
        const endpoint = `${this.baseUrl}${params.endpoint}`;
        const options: AxiosRequestConfig = {
            method: params.method,
            headers: { ...params.headers },
        };

        if (params.method === HTTPMethod.GET) {
            options.params = params.data;
        }

        if (params.method === HTTPMethod.POST) {
            options.headers = {
                ...options.headers,
                'Content-Type': 'application/json;charset=utf-8',
            };
            options.data = params.data;
        }

        return { url: endpoint, ...options };
    }

    async request<SuccessT, ErrorT = unknown, ReqT = Record<string, unknown>>(
        params: RequestParams<ReqT>
    ): Promise<ApiResponse<SuccessT, ErrorT>> {
        try {
            const requestData = this._getRequestData(params);
            const response: AxiosResponse<SuccessT> = await axios(requestData);

            return {
                success: true,
                data: response.data?.data || null,
                meta: response.data?.meta || null,
                status: response.status,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError: AxiosError<ErrorT> = error;

                return {
                    success: false,
                    data: axiosError.response?.data || null,
                    status: axiosError.response?.status || StatusHTTP.UNEXPECTED_ERROR,
                };
            }

            return {
                success: false,
                data: null,
                status: StatusHTTP.UNEXPECTED_ERROR,
            };
        }
    }
}