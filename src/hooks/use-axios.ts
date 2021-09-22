import axios from 'axios';

export const useAxios = (token: string) => {
    const baseURL = ""

    const axiosInstanceWithInterceptors = axios.create({
        baseURL,
    });

    if (token) {
        axiosInstanceWithInterceptors.interceptors.request.use((config) => {
            config.headers.authorization = 'Bearer ' + token;
            return config;
        });
    }

    return axiosInstanceWithInterceptors;
};
