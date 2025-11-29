/* eslint-disable no-throw-literal */
import { AxiosError, AxiosInstance } from 'axios'

import { app } from '@/Application'

interface ApiResponse<T> {
  success: boolean
  message: string | null
  data: T
  error: string | null
}

export async function requestApi<T = any>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  body?: any,
  headers?: any,
): Promise<{
  data: T | null
  error: { message: string | null; error: string | null } | null
}> {
  try {
    const api: AxiosInstance = app.api; 
    const { request, data, success }: any = await api.request<ApiResponse<T>>({
      url,
      method,
      data: body,
      headers,
    })

    if (!data && request?.status === 0) {
      throw { message: 'Sem conexão com a internet.', error: 'NetworkError' }
    }
    if (data && !success) {
      throw { message: data.message, error: data.error, data: null }
    }

    return { data, error: null }
  } catch (err: any) {
    if (err instanceof AxiosError) {
      if (err.code === 'ERR_NETWORK') {
        return {
          error: {
            message: 'Sem conexão com a internet.',
            error: 'NetworkError',
          },
        } as any
      }
      return {
        error: {
          error: err.response.data.error,
          message: err.response.data.message,
        },
        data: null,
      } as any
    }
    return err
  }
}

export function generate_error(error: any) {
  return typeof error?.error === 'object'
    ? Object.values(error?.error)
        .map((v:any) => `<li style="list-style: inside">${v?.message}</li>`)
        .join('')
    : `${error?.message || error?.error}<br/> `
}
