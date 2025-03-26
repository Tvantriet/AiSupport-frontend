import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:3001/api';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for adding auth token, etc.
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or elsewhere
    const token = localStorage.getItem('authToken');
    
    // If token exists, add it to the headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle specific error status codes
    if (error.response) {
      const { status } = error.response;
      
      // Handle unauthorized errors (e.g., token expired)
      if (status === 401) {
        // Clear local storage and redirect to login
        localStorage.removeItem('authToken');
        // You might want to redirect to login page here
        // window.location.href = '/login';
      }
      
      // Handle forbidden errors
      if (status === 403) {
        console.error('You do not have permission to access this resource');
      }
      
      // Handle server errors
      if (status >= 500) {
        console.error('Server error occurred. Please try again later.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server. Please check your connection.');
    } else {
      // Something happened in setting up the request
      console.error('Error setting up the request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Type for API response
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

// Generic GET function
export const get = async <T = any>(
  url: string, 
  params?: any, 
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get(url, { 
      params, 
      ...config 
    });
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  } catch (error) {
    throw error;
  }
};

// Generic POST function
export const post = async <T = any>(
  url: string, 
  data?: any, 
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  } catch (error) {
    throw error;
  }
};

// Generic PUT function
export const put = async <T = any>(
  url: string, 
  data?: any, 
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.put(url, data, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  } catch (error) {
    throw error;
  }
};

// Generic DELETE function
export const del = async <T = any>(
  url: string, 
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.delete(url, config);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  } catch (error) {
    throw error;
  }
};

// Export the axios instance as well in case you need more customization
export default apiClient; 