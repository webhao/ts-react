import Axios, {
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios';

interface Params {
  [key: string]: any;
}

Axios.defaults.baseURL = API_URL;

Axios.interceptors.request.use((arc: AxiosRequestConfig) => {
  return arc;
}, (error) => {
  return Promise.reject(error);
});

Axios.interceptors.response.use((ar: AxiosResponse) => {
  const { data } = ar;
  return data;
}, (error) => {
  return Promise.reject(error);
});

export const HttpClient = {
  async get<T = any>(url: string, params?: Params): Promise<T> {
    return (Axios.get<T>(url, { params }) as Promise<any>);
  },
};
