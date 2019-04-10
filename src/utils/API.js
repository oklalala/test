/** @format */

import axios from 'axios'
import store from '@/store'

const baseURL = process.env.VUE_APP_API_URL
const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  Accept: 'application/json'
}

const errorMessageMap = {
  'number must be unique': '請重新檢查 案號重複'
}

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

export default {
  async GET(path, data = '') {
    let query = new URLSearchParams(data).toString()
    query = query.length ? '?' + query : query
    const response = await axios
      .get(`${baseURL}${path}${query}`, {
        headers: {
          ...headers,
          'x-access-token': store.getters.token
        }
      })
      .catch(e => e.response)
    return responseHandler[response.status](response)
  },
  async POST(path, data) {
    const response = await axios
      .post(`${baseURL}${path}`, data, {
        headers: {
          ...headers,
          'x-access-token': store.getters.token
        }
      })
      .catch(e => e.response)
    return responseHandler[response.status](response)
  },
  async PUT(path, data) {
    const response = await axios
      .put(`${baseURL}${path}`, data, {
        headers: {
          ...headers,
          'x-access-token': store.getters.token
        }
      })
      .catch(e => e.response)
    return responseHandler[response.status](response)
  },
  async DELETE(path) {
    const response = await axios
      .delete(`${baseURL}${path}`, {
        headers: {
          ...headers,
          'x-access-token': store.getters.token
        }
      })
      .catch(e => e.response)
    return responseHandler[response.status](response)
  },
  async uploadImg(file) {
    let formData = new FormData()
    formData.append('img', file)
    const response = await axios
      .post(`${baseURL}/uploadImg`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': store.getters.token
        }
      })
      .catch(e => e.response)
    return responseHandler[response.status](response)
  },
  async exportXls(path, data = '') {
    let query = new URLSearchParams(data).toString()
    query = query.length ? '?' + query : query
    const res = await fetch(`${baseURL}${path}${query}`, {
      headers: {
        'x-access-token': store.getters.token
      }
    }).catch(e => e.response)
    return await res.blob()
  }
}
