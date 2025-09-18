export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
}

// Параметры запроса
export type RequestParams<ReqT> = {
    method: HTTPMethod; // Метод запроса, GET или POST
    endpoint: string; // API-endpoint, на который делается запрос
    headers: Record<string, string>; // Объект с передаваемыми HTTP-заголовками
    /**
     * Объект с данными запроса.
     * - Для GET-запроса данные превращаются в query-строку и добавляются в endpoint
     * - Для POST-запроса данные преобразуются к формату JSON и добавляются в тело запроса (необязательное требование)
     */
    data: ReqT;
};

// Перечисление статусов ответа
export enum StatusHTTP {
    status200 = 200,
    status201 = 201,
    status300 = 300,
    status304 = 304,
    status400 = 400,
    status401 = 401,
    status403 = 403,
    status404 = 404,
    status422 = 422,
    UNEXPECTED_ERROR = 'UNEXPECTED ERROR',
}

// Ответ API
export type ApiResponse<SuccessT, ErrorT> =
    | {
        success: true;
        data: SuccessT;
        meta: {
            pagination: {
                page: number;
                pageCount: number;
                pageSize: number;
                total: number;
            };
        }
        status: StatusHTTP;
    }
    | {
        success: false;
        data: ErrorT;
        status: StatusHTTP;
    }
    | {
        success: false;
        data: null;
        status: StatusHTTP;
    };

// Интерфейс для класса, с помощью которого можно делать запросы к API
export interface IApiStore {
    // базовый url для выполнения запросов. TODO: указать url GitHub API в классе ApiStore
    readonly baseUrl: string;

    // Метод, с помощью которого делается запрос. TODO: реализовать в классе ApiStore
    request<SuccessT, ErrorT = unknown, ReqT = Record<string, unknown>>(
        params: RequestParams<ReqT>
    ): Promise<ApiResponse<SuccessT, ErrorT>>;
}