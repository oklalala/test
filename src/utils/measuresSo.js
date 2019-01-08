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

let powerChannel = 0
let switchChannel = 1
let open = 0
let close = 1

export default function(wiseIP, formData) {
  wiseConfig.wiseIP = 'http://' + wiseIP
  // delay()
  initializationSO()
  .then(()=>switchSO(powerChannel,open))
  .then(()=>switchSO(switchChannel,open))
  .then(() =>getSORawData())
  .then(res=>{
    console.log(res.data)
  })
  .then(()=>switchSO(switchChannel,close))
  .then(()=>switchSO(switchChannel,open))
  .then(() =>getSORawData())
  .then(res=>{
    console.log(res.data)
  })
  .then(() =>switchSO(switchChannel,close))
  .then(() =>switchSO(switchChannel,open))
  .then(() =>getSORawData())
  .then(res => {
    console.log(res.data);
  })
  // .then(() =>switchSO(0,1))
  // .then(() => getSORawData())
  // .then(res => {
  //   console.log(res.data);
  //   // switchSO(1,0)
  // })
  formData.push('fuck')
}

// 加個 delay function 不讓他太快切換

function initializationSO() {
  return requestMeasuresSO('Patch', '/do_value/slot_0', {
    DOVal: [{
      Ch: powerChannel,
      Val: close
    }, {
      Ch: switchChannel,
      Val: close
    }]
  })
}

function switchSO(channel, value) {
  delay()
  return requestMeasuresSO('Patch', '/do_value/slot_0', {
    DOVal: [{
      Ch: channel,
      Val: value
    }]
  })
}

function getSORawData() {
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

function delay() {
  for (let i = 0; i < 1000; i++) {
    console.log(i)
    // console.clear()
  }
}
