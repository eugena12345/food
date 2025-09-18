export type RecipiesListParams = {
    populate: string[],
    pagination: {
        page: number,
        pageSize: number,
    }
};

export enum Meta {
    initial = 'initial', // Процесс не начат
    loading = 'loading', // В процессе загрузки
    error = 'error', // Завершилось с ошибкой
    success = 'success' // Завершилось успешно
};

export type PrivateFields = '_recepies' | '_meta' | '_metaInfo';
