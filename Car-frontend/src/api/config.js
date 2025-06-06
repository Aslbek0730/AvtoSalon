import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
    ? 'http://localhost:5000/api'  // Production backend URL
    : 'http://localhost:5000/api'; // Development backend URL

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Token cookie orqali avtomatik yuboriladi
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token muddati tugagan yoki noto'g'ri
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api; 