import { ENV } from '@/config/env';
import { handleAxiosError } from '@/shared/utils/axios.utils';
import axios, { AxiosError } from 'axios';

const suggestionAxiosInstance = axios.create({
  baseURL: ENV.API_SUGGESTIONS_URL,
  timeout: ENV.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

suggestionAxiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
      const { message, status } = handleAxiosError(error);
      return Promise.reject({ message, status });
    }
);

export default suggestionAxiosInstance;
