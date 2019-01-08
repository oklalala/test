/** @format */

import axios from 'axios'

let wiseConfig = {
  user: 'root',
  password: '0000',
  wiseIP: ''
}

// methods  url_path               data
// patch    /do_value/slot_0       {"DOVal":[{"Ch":0,"Val":1},{"Ch":1,"Val":1}]}
// patch    /do_value/slot_0       {"DOVal":[{"Ch":0,"Val":0}]}
// patch    /do_value/slot_0       {"DOVal":[{"Ch":1,"Val":0}]}:
// get      /ai_value/slot_0/ch_0  ""
// patch    /do_value/slot_0       {"DOVal":[{"Ch":1,"Val":1}]}:
// patch    /do_value/slot_0       {"DOVal":[{"Ch":1,"Val":0}]}:
// get      /ai_value/slot_0/ch_0  ""
// patch    /do_value/slot_0       {"DOVal":[{"Ch":1,"Val":1}]}:
// patch    /do_value/slot_0       {"DOVal":[{"Ch":1,"Val":0}]}:
// get      /ai_value/slot_0/ch_0  ""


let powerChannel = 0
let switchChannel = 1
let open = 0
let close = 1

export default function(wiseIP, formData) {
  wiseConfig.wiseIP = 'http://' + wiseIP
  let xData,yData,temp
  initializationSO()
  .then(()=>switchSO(powerChannel,open))
  .then(()=>switchSO(switchChannel,open))
  .then(() =>getSORawData())
  .then(res=>{
    xData = res.data
  })
  .then(()=>switchSO(switchChannel,close))
  .then(()=>switchSO(switchChannel,open))
  .then(() =>getSORawData())
  .then(res=>{
    temp = res.data
  })
  .then(() =>switchSO(switchChannel,close))
  .then(() =>switchSO(switchChannel,open))
  .then(() =>getSORawData())
  .then(res => {
    yData = res.data
  })
  .then(()=>{
    console.log("fuck",xData,temp,yData)
  })
  formData.push('fuck')
}


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
  delay()
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
  console.groupCollapsed('delay', true)
  for (let i = 0; i < 5000; i++) {
    console.log(i)
  }
  console.groupEnd()
}
