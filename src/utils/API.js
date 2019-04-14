/** @format */

import store from '@/store'
import backendAPI from './backendAPI'

export default {
  async GET(path, data = '') {
    let query = new URLSearchParams(data).toString()
    query = query.length ? '?' + query : query
    return backendAPI.get(path + query)
  },
  async POST(path, data) {
    return backendAPI.post(path, data)
  },
  async PUT(path, data) {
    return backendAPI.put(path, data)
  },
  async DELETE(path) {
    return backendAPI.delete(path)
  },
  async uploadImg(file) {
    let formData = new FormData()
    formData.append('img', file)
    return await backendAPI.post(`/uploadImg`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  async exportXls(path, data = '') {
    const baseURL = process.env.VUE_APP_API_URL

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
