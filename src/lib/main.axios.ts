import { ENV } from '@/config/env';
import { handleAxiosError } from '@/shared/utils/axios.utils';
import axios, { AxiosError, type AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.log('Intercepted error:', error);
    const { message, status } = handleAxiosError(error);
    return Promise.reject({ message, status });
  }
);

export default axiosInstance;
