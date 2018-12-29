/** @format */

import axios from 'axios'

let wiseConfig = {
  user: 'root',
  password: '0000',
  wiseIP: ''
}

// methods  url_path               data
// patch    /do_value/slot_0       {"DOVal":[{"Ch":0,"Val":0},{"Ch":1,"Val":0}]}
// patch    /do_value/slot_0       {"DOVal":[{"Ch":1,"Val":1}]}
// patch    /do_value/slot_0       {"DOVal":[{"Ch":0,"Val":1}]}:
// get      /ai_value/slot_0/ch_0  ""
// patch    /do_value/slot_0       {"DOVal":[{"Ch":0,"Val":0}]}:
// patch    /do_value/slot_0       {"DOVal":[{"Ch":0,"Val":1}]}:
// get      /ai_value/slot_0/ch_0  ""
// patch    /do_value/slot_0       {"DOVal":[{"Ch":1,"Val":0}]}:

export default function(wiseIP, formData) {
  wiseConfig.wiseIP = 'http://' + wiseIP
  requestMeasuresSo('Patch', '/do_value/slot_0', {DOVal:[{"Ch":0,"Val":0},{"Ch":1,"Val":0}]})
    .then(() => requestMeasuresSo('Patch', '/do_value/slot_0', {DOVal:[{"Ch":1,"Val":1}]}))
    .then(() => requestMeasuresSo('Patch', '/do_value/slot_0', {DOVal:[{"Ch":0,"Val":1}]}))
    .then(() => requestMeasuresSo('Get', '/ai_value/slot_0/ch_0', ''))
    .then(res => {
      console.log(res.data)
      return requestMeasuresSo('Patch', '/do_value/slot_0', {DOVal:[{"Ch":0,"Val":0}]})
    })
    .then(()=>requestMeasuresSo('Patch', '/do_value/slot_0', {DOVal:[{"Ch":0,"Val":1}]}))
    .then(() => requestMeasuresSo('Get', '/ai_value/slot_0/ch_0', ''))
    .then(res=>{
      console.log(res.data)
      return requestMeasuresSo('Patch', '/do_value/slot_0', {DOVal:[{"Ch":1,"Val":0}]})
    })
  formData.push('fuck')
}

function requestMeasuresSo(method, path, data) {
  return axios({
    method: method,
    url: wiseConfig.wiseIP + path,
    data: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      Authorization: makeBasicAuth(wiseConfig.user, wiseConfig.password)
    }
  })
}

function makeBasicAuth(user, password) {
  var tok = user + ':' + password
  var hash = window.btoa(tok)
  return 'Basic ' + hash
}
