export type PrivateFields = '_identifier' | '_email' | '_password' | '_repeatPassword' | '_error' | '_isLoading';

export type LoginParams = {
    identifier: string,
    password: string
}