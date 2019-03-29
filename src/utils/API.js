/** @format */

import axios from 'axios'
import store from '@/store'

const baseURL = process.env.VUE_APP_API_URL
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}
export default {
  async GET(path, data = '') {
    let query = new URLSearchParams(data).toString()
    query = query.length ? '?' + query : query
    const response = await axios.get(`${baseURL}${path}${query}`, {
      headers: {
        ...headers,
        'x-access-token': store.getters.token
      }
    })
    if (response.status === 200) {
      return response.data
    } else {
      return response
    }
  },
  async POST(path, data) {
    const response = await axios.post(`${baseURL}${path}`, data, {
      headers: {
        ...headers,
        'x-access-token': store.getters.token
      }
    })
    if (response.status === 200) {
      return response.data
    } else {
      return response
    }
  },
  async PUT(path, data) {
    const response = await axios.put(`${baseURL}${path}`, data, {
      headers: {
        ...headers,
        'x-access-token': store.getters.token
      }
    })
    if (response.status === 200) {
      return response.data
    } else {
      return response
    }
  },
  async DELETE(path) {
    const response = await axios.delete(`${baseURL}${path}`, {
      headers: {
        ...headers,
        'x-access-token': store.getters.token
      }
    })
    if (response.status === 200) {
      return response.data
    } else {
      return response
    }
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
    if (response.status === 200) {
      return response.data
    } else {
      return response
    }
  }
}
