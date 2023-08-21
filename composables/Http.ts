import {UseFetchOptions} from 'nuxt/app'
type Methods = 'GET' | 'POST' | 'DELETE' | 'PATCH'
const BASE_URL = 'http://192.168.3.6:3000'
export interface IResultData<T> {
  code: number,
  msg: string,
  data: T
}
type SelfFetchOptions<T> = (UseFetchOptions<T> & {_autoLoading?: boolean})
class Http {
  request<T = unknown>(url: string, method: Methods, data?: any, opts?: SelfFetchOptions<T>) {
    return new Promise((resolve, reject) => {
      const newOptions: SelfFetchOptions<T> = {
        baseURL: BASE_URL,
        method: method,
        ...opts,
      }
      if (method === "GET" || method === "DELETE") {
        newOptions.params = data;
      }
      if (method === "POST" || method === "PATCH") {
        newOptions.body = data;
      }
      useFetch(url, newOptions)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
  get<T = any>(url: string, params?: any, options?: SelfFetchOptions<T>) {
    return this.request(url, "GET", params, options);
  }
  post<T = any>(url: string, data: any, options?: SelfFetchOptions<T>) {
    return this.request(url, "POST", data, options);
  }

  patch<T = any>(url: string, data: any, options?: SelfFetchOptions<T>) {
    return this.request(url, "PATCH", data, options);
  }

  delete<T = any>(url: string, params: any, options?: SelfFetchOptions<T>) {
    return this.request(url, "DELETE", params, options);
  }
}

export const http = new Http()