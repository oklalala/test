/** @format */

import axios from 'axios'
import store from '@/store'

export default function(file) {
  let formData = new FormData()
  formData.append('img', file)
  let baseURL = process.env.VUE_APP_API_URL + '/uploadImg'
  return axios.post(baseURL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-access-token': store.getters.token
    }
  })
}
