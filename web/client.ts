/* eslint-disable import/no-named-as-default-member */

import axios, { type AxiosInstance } from 'axios'
import Nullstack, { type NullstackClientContext } from 'nullstack'

import Application from './src/Application'

const context = Nullstack.start(Application) as NullstackClientContext & {
  api: AxiosInstance
}

context.start = async function start() {
  const { settings } = context
  const api = axios.create({
    baseURL: settings.endpoint as string,
    timeout: 60000,
  })
  api.interceptors.request.use(
    (config) => {
      const token = window.localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  // Interceptador de respostas (para tratar erros globalmente)
  api.interceptors.response.use(
    (response) => {
      const { data } = response
      return data
    },
    (error) => {
      // @ts-expect-error
      if (axios.isCancel(error)) {
        return Promise.reject(error)
      }

      // return error
      return Promise.reject(error)
    },
  )

  // Exporta a capacidade de criar cancel tokens
  // @ts-expect-error
  api.CancelToken = axios.CancelToken
  // @ts-expect-error
  api.isCancel = axios.isCancel

  context.api = api
}

export default context
