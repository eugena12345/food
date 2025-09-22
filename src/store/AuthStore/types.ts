export type PrivateFields = '_identifier' | '_email' | '_password' | '_repeatPassword' | '_error' | '_isLoading' | 'isAuthenticated';

export type LoginParams = {
    identifier: string,
    password: string
}