/** @format */

import axios from 'axios'
import store from '@/store'

const backendAPI = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json'
  }
})

backendAPI.interceptors.request.use(function(config) {
  config.headers['x-access-token'] = store.getters.token
  return config
})

backendAPI.interceptors.response.use(
  function(response) {
    return responseHandler[response.status](response)
  },
  function(error) {
    const response = error.response
    return responseHandler[response.status](response)
  }
)

const responseHandler = {
  '200': res => res.data,
  '401': res => {
    // token 過期
    store.dispatch('logout')
    return Promise.reject(res.data)
  },
  '400': res => {
    if (res.data.result in errorMessageMap)
      res.data.message = errorMessageMap[res.data.result]
    else res.data.message = res.data.result
    return Promise.reject(res.data)
  }
}

const errorMessageMap = {
  'number must be unique': '案號重複',
  'name must be unique': '名稱重複'
}

export default backendAPI
