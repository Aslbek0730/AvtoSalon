import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://car-salon-backend.onrender.com/api'  // Production backend URL
    : 'http://localhost:5000/api'; // Development backend URL

console.log('Current API URL:', API_URL); // Debug URL

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000 // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        console.log('Making request to:', config.url); // Debug request
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('Response received:', response.status); // Debug response
        return response;
    },
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout');
            return Promise.reject({ message: 'Request timeout. Please try again.' });
        }

        console.error('Response error:', {
            status: error.response?.status,
            data: error.response?.data,
            config: error.config,
            url: error.config?.url,
            message: error.message
        });
        
        if (error.response?.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api; 