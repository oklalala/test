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
let ON = 0
let OFF = 1

export default function(wiseIP, formData) {
  wiseConfig.wiseIP = 'http://' + wiseIP
  let digitX, digitTemp, digitY
  let slopeX, temp, slopeY
  initializationSO(powerChannel, OFF, switchChannel, OFF)
    .then(() => switchSO(powerChannel, ON))
    .then(() => switchSO(switchChannel, ON))
    .then(() => getSORawData())
    .then(res => {
      digitX = res.data
    })
    .then(() => switchSO(switchChannel, OFF))
    .then(() => switchSO(switchChannel, ON))
    .then(() => getSORawData())
    .then(res => {
      digitTemp = res.data
    })
    .then(() => switchSO(switchChannel, OFF))
    .then(() => switchSO(switchChannel, ON))
    .then(() => getSORawData())
    .then(res => {
      digitY = res.data
    })
    .then(() => {
      initializationSO(powerChannel, OFF, switchChannel, OFF)
    })
    .then(() => {
      temp = calculatingTemperature(digitTemp.Eg / 1000000)
      slopeX = calculatingTiltForMM(digitX.Eg / 1000000, temp)
      slopeY = calculatingTiltForMM(digitY.Eg / 1000000, temp)
      console.log(`
      X軸斜率(mm/m)： ${slopeX}
      溫度： ${temp}
      Y軸斜率(mm/m)：${slopeY}
      `)
      console.log(`
      X軸斜率(度C)： ${calculatingTiltForDegress(slopeX)}
      Y軸斜率(度C)： ${calculatingTiltForDegress(slopeY)}
      `)
    })
  formData.push('fuck')
}

function initializationSO(
  powerChannel,
  powerStatus,
  switchChannel,
  switchStatus
) {
  return requestMeasuresSO('Patch', '/do_value/slot_0', {
    DOVal: [
      {
        Ch: powerChannel,
        Val: powerStatus
      },
      {
        Ch: switchChannel,
        Val: switchStatus
      }
    ]
  })
}

function switchSO(channel, value) {
  delay()
  return requestMeasuresSO('Patch', '/do_value/slot_0', {
    DOVal: [
      {
        Ch: channel,
        Val: value
      }
    ]
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

function calculatingTemperature(Eg) {
  // 計算溫度
  return (
    9.3219 * Math.pow(Eg, 5) -
    54.3038 * Math.pow(Eg, 4) +
    131.165 * Math.pow(Eg, 3) -
    161.2568 * Math.pow(Eg, 2) +
    137.7711 * Eg -
    37.7705
  )
}
function calculatingTiltForMM(volts, tempC) {
  // 計算傾斜 mm/m
  // 傾度管公式： C5 x Volts2 + C4 x Volts + C3 + C2 x TdegC + C1 x TdegC2 +C0 x Volts x TdegC
  let SO_C = [1.8162e-2, 4.026e-3, -1.4713e-1, 6.6525, 7.9756e1, 3.5082e-2]
  let rawData = [tempC * volts, tempC * tempC, tempC, 1, volts, volts * volts]
  let slope = 0
  SO_C.forEach((item,index)=>{
    slope += item*rawData[index]
  })
  return slope
}
function calculatingTiltForDegress(tilt){
  // 計算傾斜度數
  return tilt/1000/3.14*180
}
