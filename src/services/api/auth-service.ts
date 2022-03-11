import { publicAxios as api} from "./base";

export const login = async (data: LoginData): Promise<LoginResponse> => {

    const response = await api.post('/session/login', data);
    return response.data as LoginResponse;
};

export const signup = async (data: LoginData): Promise<() => void> => {

    const response = await api.post('/session/register', data);
    return response.data;
};

export const forgot = async (data: ForgotData): Promise<() => void> => {

    const response = await api.post('/session/recovery', data);
    return response.data;
};

export type LoginData = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
};

export type ForgotData = {
    email: string;
};
