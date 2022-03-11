export const setLocalToken = (token: string): void => {
    localStorage.setItem('token', token);
};

export const getLocalToken = (): string | null => {
    return localStorage.getItem('token');
};