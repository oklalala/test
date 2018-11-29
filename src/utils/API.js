/** @format */

import axios from 'axios'
import localStore from 'store'

export default function(method, path, isAuth, data) {
  let headers = {
    Accept: 'application/json'
  }

  if (isAuth) {
    headers['x-access-token'] = localStore.get('ground_monitor_token')
  }

  let configs = {
    baseURL: process.env.VUE_APP_API_URL,
    headers
  }

  return axios.create(configs)[method](path, data)
}
