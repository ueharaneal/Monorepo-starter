export interface ApiResponse<T = any> {
    data?: T;
    error?: string;
    status: number;
}
export interface User {
    id: string;
    email?: string;
    name?: string;
    created_at?: string;
}
