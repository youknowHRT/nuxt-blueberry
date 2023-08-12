// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
// import { closeToast, showLoadingToast } from 'vant'
// import {mockItemIndexBalance, mockItemIndex, mockTagIndex, mockTagShow, mockItemSummary} from '@/mock'

// type GetConfig = Omit<AxiosRequestConfig, 'url' | 'params' | 'methods'>
// type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'methods'>
// import {router} from '@/route/index'
// export class Http {
//   instance: AxiosInstance
//   constructor(baseURL: string) {
//     this.instance = axios.create({ baseURL })
//   }
//   get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
//     return this.instance.request<R>({ ...config, url, params: query, method: 'get' })
//   }
//   post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
//     return this.instance.request<R>({ ...config, url, data, method: 'post' })
//   }
//   patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
//     return this.instance.request<R>({ ...config, url, data, method: 'patch' })
//   }
//   delete<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
//     return this.instance.request<R>({ ...config, url, params: query, method: 'delete' })
//   }
// }

// export const http = new Http('/api/v1')

// http.instance.interceptors.request.use(
//   (config) => {
//     const jwt = localStorage.getItem('jwt')
//     if (jwt) {
//       config.headers.Authorization = `Bearer ${jwt}`
//     }
//     console.log(config, '🍋')
//     if (config._autoLoading === true) {
//       showLoadingToast({
//         message: '加载中...',
//         forbidClick: true,
//         duration: 0
//       })
//     }
//     return config
//   },
//   (error) => {
//     // 对请求错误做些什么
//     return Promise.reject(error)
//   }
// )

// http.instance.interceptors.response.use(
//   (response) => {
//     console.log(response, '🍎')
//     if (response.config._autoLoading === true) {
//       closeToast()
//     }
//     return response
//   },
//   (error) => {
//     // 超出 2xx 范围的状态码都会触发该函数。
//     // 对响应错误做点什么
//     if (error.config._autoLoading === true) {
//       closeToast()
//     }
//     if (error.response?.status === 401) {
//       const route = router.options.history.location
//       router.push(`/login?return_to=${route}`)
//     }
//     if (error.response?.status === 429) {
//       alert('你太频繁了')
//     }
//     return Promise.reject(error)
//   }
// )

// const mock = (response: AxiosResponse) => {
//   if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1' && location.hostname !== '192.168.3.57')
//     return
//   switch (response?.config?._mock) {
//     case 'itemIndexBalance':
//       [response.status, response.data]=mockItemIndexBalance(response.config)
//       return true
//     case 'itemIndex':
//       [response.status, response.data]=mockItemIndex(response.config)
//       return true
//     case 'tagIndex':
//       [response.status, response.data]=mockTagIndex(response.config)
//       return true
//     case 'tagShow':
//       [response.status, response.data]=mockTagShow(response.config)
//       return true
//     case 'itemSummary':
//       [response.status, response.data]=mockItemSummary(response.config)
//       return true
//   }
//   return false
// }
// http.instance.interceptors.response.use(
//   (response) => {
//     mock(response)
//     if (response.status >= 400) throw response
//     return response
//   },
//   (error) => {
//     mock(error.response)
//     if (error.response.status >= 400) throw error
//     return error.response
//   }
// )