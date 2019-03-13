/** @format */

import axios from 'axios'
import store from '@/store'

export default function(method, path, isAuth, data) {
  let headers = {
    Accept: 'application/json'
  }

  if (isAuth) {
    headers['x-access-token'] = store.getters.token
  }

  let configs = {
    baseURL: process.env.VUE_APP_API_URL,
    headers
  }
  return axios
    .create(configs)
    [method](path, data)
    .catch(e => {
      let message = e.response.data.result
      if (message === 'jwt expired' || message === 'invalid token') {
        store.dispatch('logout')
      }
    })
}
