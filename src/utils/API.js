/** @format */

import axios from 'axios'
import store from '@/store'

const baseURL = process.env.VUE_APP_API_URL
const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  Accept: 'application/json'
}

const responseHandler = {
  '200': res => res.data,
  '401': res => {
    // token 過期
    store.dispatch('logout')
    Promise.reject(res)
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
    const response = await axios.post(`${baseURL}${path}`, data, {
      headers: {
        ...headers,
        'x-access-token': store.getters.token
      }
    })
    return responseHandler[response.status](response)
  },
  async PUT(path, data) {
    const response = await axios.put(`${baseURL}${path}`, data, {
      headers: {
        ...headers,
        'x-access-token': store.getters.token
      }
    })
    return responseHandler[response.status](response)
  },
  async DELETE(path) {
    const response = await axios.delete(`${baseURL}${path}`, {
      headers: {
        ...headers,
        'x-access-token': store.getters.token
      }
    })
    return responseHandler[response.status](response)
  },
  async uploadImg(file) {
    let formData = new FormData()
    formData.append('img', file)
    const response = await axios.post(`${baseURL}/uploadImg`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': store.getters.token
      }
    })
    return responseHandler[response.status](response)
  },
  async exportXls(path, data = '') {
    let query = new URLSearchParams(data).toString()
    query = query.length ? '?' + query : query
    const res = await fetch(`${baseURL}${path}${query}`, {
      headers: {
        'x-access-token': store.getters.token
      }
    })
    return await res.blob()
  }
}
