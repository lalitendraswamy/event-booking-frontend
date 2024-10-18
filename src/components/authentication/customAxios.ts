import axios from "axios";
import { getCookie } from "../../utils/cookieUtils";

// Create an Axios instance
const customAxios = axios.create({
    baseURL: "http://localhost:5000",
});

// Add a request interceptor
customAxios.interceptors.request.use(
    (config) => {
        const token = getCookie("token"); // Or wherever you store your token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log(error.message)
        return Promise.reject(error);
    }
);


export default customAxios;