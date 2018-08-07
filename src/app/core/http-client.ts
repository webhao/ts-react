import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import UserStore from './user.store';

interface Params {
  [key: string]: any;
}

Axios.defaults.baseURL = API_URL;

async function rejectedInterceptor(error: any) {
  return Promise.reject(error);
}

Axios.interceptors.request.use((arc: AxiosRequestConfig) => {
  const { headers } = arc;
  // 未登录或者 request headers 里已有 token
  if (!UserStore.isLogin || headers && headers.token) {
    return arc;
  }
  return { ...arc, headers: { ...headers, token: UserStore.token } };
}, rejectedInterceptor);

Axios.interceptors.response.use((ar: AxiosResponse) => {
  const { data } = ar;
  if (data.error) {
    return Promise.reject(data.error.message);
  }
  if (!data.data) {
    return data;
  }
  return data.data;
}, rejectedInterceptor);

export class HttpClient {
  static async get<T = any>(url: string, params?: Params): Promise<T> {
    return Axios.get(url, { params }) as Promise<any>;
  }

  static async post<T = any>(url: string, data: any): Promise<T> {
    return Axios.post(url, data) as Promise<any>;
  }
}
