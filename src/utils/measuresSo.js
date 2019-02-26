/** @format */
import axios from 'axios'
import store from '../store'
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
let PI = 3.1415926
export default function(wiseIP, formData, soItem, depth) {
  console.log(store.getters.getTest)
  wiseConfig.wiseIP = 'http://' + wiseIP
  let digitX, digitTemp, digitY
  let tableData
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
      tableData = getMeasurementData(digitTemp.Eg, digitX.Eg, digitY.Eg, soItem, depth, formData)
      formData.unshift(tableData)
    })
}

function initializationSO(powerChannel, powerStatus, switchChannel, switchStatus) {
  return requestMeasuresSO('Patch', '/do_value/slot_0', {
    DOVal: [{
      Ch: powerChannel,
      Val: powerStatus
    }, {
      Ch: switchChannel,
      Val: switchStatus
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
  // console.groupCollapsed('delay', true)
  // for(let i = 0; i < 5000; i++) {
  //   console.log(i)
  // }
  // console.groupEnd()
  // 不用 console 的方式實作 delay
  var starttime = new Date().getTime();
  do {} while ((new Date().getTime() - starttime) < 500)
}

function getMeasurementData(rowTemp, rowX, rowY, soItem, totalDepth, formData) {
  let VoltageTemp, VoltageX, VoltageY
  let slopeX, temp, slopeY
  let degreeX, degreeY
  let displacementX, displacementY
  let totalDisplacement, depth
  VoltageTemp = rowTemp / 1000000
  VoltageX = rowX / 1000000
  VoltageY = rowY / 1000000
  // 溫度： ${temp}
  // X軸斜率(mm/m)： ${slopeX}
  // Y軸斜率(mm/m)：${slopeY}
  temp = calculatingTemperature(VoltageTemp)
  slopeX = calculatingTiltForMM(VoltageX, temp, soItem)
  slopeY = calculatingTiltForMM(VoltageY, temp, soItem)
  // X軸斜率(度C)： ${degreeX}
  // Y軸斜率(度C)： ${degreeY}
  degreeX = calculatingTiltForDegress(slopeX)
  degreeY = calculatingTiltForDegress(slopeY)
  // X軸水平位移量(cm)： ${displacementX}
  // X軸水平位移量(cm)： ${displacementY}
  displacementX = calculatingHorizontalDisplacement(degreeX, 100)
  displacementY = calculatingHorizontalDisplacement(degreeY, 100)
  console.log(formData)
  totalDisplacement = formData.length ? formData[0].totalDisplacement + displacementX : displacementX
  depth = -totalDepth + formData.length
  let tableData = {
    date: getDate(),
    time: getTime(),
    temp: temp,
    VoltageX: VoltageX,
    degreeX: degreeX,
    displacement: displacementX,
    totalDisplacement: totalDisplacement,
    depth: depth
  }
  return tableData
}

function calculatingTemperature(Eg) {
  let tempFormulaParameter = store.getters.getTempFormulaParameter
  let temp = tempFormulaParameter.reduce((value, parameter, index) => {
    if(index % 2 === 0) {
      return value - parameter * Math.pow(Eg, index)
    } else {
      return value + parameter * Math.pow(Eg, index)
    }
  }, 0)
  return temp
  // 計算溫度的公式
  // return (
  // 9.3219 * Math.pow(Eg, 5) -
  // 54.3038 * Math.pow(Eg, 4) +
  // 131.165 * Math.pow(Eg, 3) -
  // 161.2568 * Math.pow(Eg, 2) +
  // 137.7711 * Math.pow(Eg, 1) -
  // 37.7705 * Math.pow(Eg, 0)
  // )
}

function calculatingTiltForMM(volts, tempC, soItem) {
  // 這邊可加入判斷式與各型號的公式
  // 計算傾斜 mm/m
  let slope = 0
  if(soItem.soModel.id === 'something') {
    let SO = soItem.parameters
    // 傾度管公式： C0 x Volts x TdegC + C1 x TdegC2 + C2 x TdegC + C3  + C4 x Volts + C5 x Volts2
    let rawData = [SO.c0 * tempC * volts, SO.c1 * tempC * tempC, SO.c2 * tempC, SO.c3 * 1, SO.c4 * volts, SO.c5 * volts * volts]
    slope = rawData.reduce((prev, curr) => {
      return prev + curr
    }, 0)
  }
  return slope
}

function calculatingTiltForDegress(tilt) {
  // 計算傾斜度數
  return(tilt / 1000 / PI) * 180
}

function calculatingHorizontalDisplacement(degree, length) {
  //       Math.sin(弧度)
  //       Math.sin(角度*3.1415926/180)*100
  //       求 Z 軸水平偏移量： (X 軸水平偏移平方 + y 軸水平偏移平方) 開根號
  return Math.sin((degree * PI) / 180) * length
}

function getDate() {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return `${year}/${month}/${day}`
}

function getTime() {
  let date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  return `${hour}:${minute}:${second}`
}
