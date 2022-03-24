export interface APIResponse<T> {
    pk: number;
    model: string;
    fields: T;
}
