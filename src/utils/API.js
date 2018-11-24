/** @format */

import axios from 'axios'
import store from '@/store.js'

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

  if (data) {
    configs.data = data
  }

  return axios.create(configs)[method](path)
}
