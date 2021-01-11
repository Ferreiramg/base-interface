import axios from "axios";

const { REACT_APP_API_URL } = process.env;

const api = axios.create({
    baseURL: REACT_APP_API_URL
});
//REQUEST INTERCEPT
api.interceptors.request.use(async (config) => {
    // const { token } = AuthService.getAuthToken();

    // if (token && !config.guest) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    // if (config.method !== 'get') {
    //     EventEmmiter.dispatch('loading', true);
    // }
    return config;
});
//RESPONSE INTERCEPT
api.interceptors.response.use(async response => {
    return response;
}, error => {
    if (401 === error.response?.status) {
        console.log(error.response);
    }
    return Promise.reject(error.response);
});

export default api;