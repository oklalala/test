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
  initializationSO()
    .then(() =>switchSO(1,1))
    .then(() =>switchSO(0,1))
    .then(() =>getSORawData())
    .then(res => {
      console.log(res.data);
      switchSO(0,0)
    })
    .then(() =>switchSO(0,1))
    .then(() => getSORawData())
    .then(res => {
      console.log(res.data);
      switchSO(1,0)
    })
  formData.push('fuck')
}

function initializationSO(){
  return requestMeasuresSO('Patch', '/do_value/slot_0', {
    DOVal: [{ Ch: 0, Val: 0 }, { Ch: 1, Val: 0 }]
  })
}

function switchSO(channel,value){
  return requestMeasuresSO('Patch', '/do_value/slot_0', {
    DOVal: [{ Ch: channel, Val: value }]
  })
}

function getSORawData(){
  return requestMeasuresSO('Get', '/ai_value/slot_0/ch_0', '')
}

function requestMeasuresSO(method, path, data) {
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
