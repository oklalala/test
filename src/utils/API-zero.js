/** @format */

import axios from 'axios'
import store from '@/store'

const baseURL = process.env.VUE_APP_API_URL;
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
export default {
  async GET(path, data) {
    var query = data || '' && `?${new URLSearchParams(data).toString()}`
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
    const response = await axios.post(`${baseURL}${path}`,
      data, {
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
  async PUT (path, data) {
    const response = await axios.put(`${baseURL}${path}`,
      data, {
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
  }
}
