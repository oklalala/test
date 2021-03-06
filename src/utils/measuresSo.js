/** @format */
import axios from 'axios'
import store from '../store'
let wiseConfig = {
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
  wiseConfig.wiseIP = 'http://' + wiseIP
  let digitX, digitTemp, digitY
  let tableData

  return initializationSO(powerChannel, OFF, switchChannel, OFF)
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
      tableData = getMeasurementData(
        digitTemp.Eg,
        digitX.Eg,
        digitY.Eg,
        soItem,
        depth,
        formData
      )
      formData.unshift(tableData)
    })
}

function initializationSO(
  powerChannel,
  powerStatus,
  switchChannel,
  switchStatus
) {
  return soAPI('PATCH', '/do_value/slot_0', {
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
  delay500ms()
  return soAPI('PATCH', '/do_value/slot_0', {
    DOVal: [
      {
        Ch: channel,
        Val: value
      }
    ]
  })
}

function getSORawData() {
  delay500ms()
  return soAPI('GET', '/ai_value/slot_0/ch_0', '')
}

function soAPI(method, path, data) {
  return axios({
    method: method,
    url: wiseConfig.wiseIP + path,
    data: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      Authorization: `Basic cm9vdDowMDAw`
    }
  })
}

function delay500ms() {
  var starttime = new Date().getTime()
  do {} while (new Date().getTime() - starttime < 500) // eslint-disable-line
}

function getMeasurementData(rowTemp, rowX, rowY, soItem, totalDepth, formData) {
  let VoltageTemp, VoltageX, VoltageY
  let slopeX, temp, slopeY
  let degreeX, degreeY
  let displacementX, displacementY // eslint-disable-line
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
  console.log('temp/slope', temp, slopeX, slopeY)
  // X軸斜率(度C)： ${degreeX}
  // Y軸斜率(度C)： ${degreeY}
  degreeX = calculatingTiltForDegress(slopeX)
  degreeY = calculatingTiltForDegress(slopeY)
  console.log('degree', degreeX, degreeY)
  // X軸水平位移量(cm)： ${displacementX}
  // X軸水平位移量(cm)： ${displacementY}
  displacementX = calculatingHorizontalDisplacement(degreeX, 100)
  displacementY = calculatingHorizontalDisplacement(degreeY, 100)
  totalDisplacement = formData.length
    ? formData[0].totalDisplacement + displacementX
    : displacementX
  depth = -totalDepth + formData.length
  console.log(
    'displacementXY, totalDisplacement, depth',
    displacementX,
    displacementY,
    totalDisplacement,
    depth
  )
  return {
    date: getYYYYMMDD(),
    time: getHHMMSS(),
    temp: temp,
    VoltageX: VoltageX,
    degreeX: degreeX,
    displacement: displacementX,
    totalDisplacement: totalDisplacement,
    depth: depth
  }
}

function calculatingTemperature(Eg) {
  let tempFormulaParameter = store.getters.getTempFormulaParameter
  let temp = tempFormulaParameter.reduce((value, parameter, index) => {
    if (index % 2 === 0) {
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
  let soModel = soItem.soModel.id
  if (soModel === 'something') {
    let SO = soItem.parameters
    // 傾度管公式： C0 x Volts x TdegC + C1 x TdegC2 + C2 x TdegC + C3  + C4 x Volts + C5 x Volts2
    let rawData = [
      SO.c0 * tempC * volts,
      SO.c1 * tempC * tempC,
      SO.c2 * tempC,
      SO.c3 * 1,
      SO.c4 * volts,
      SO.c5 * volts * volts
    ]
    slope = rawData.reduce((prev, curr) => {
      return prev + curr
    }, 0)
  }
  return slope
}

function calculatingTiltForDegress(tilt) {
  // 計算傾斜度數
  return (tilt / 1000 / PI) * 180
}

function calculatingHorizontalDisplacement(degree, length) {
  //       Math.sin(弧度)
  //       Math.sin(角度*3.1415926/180)*100
  //       求 Z 軸水平偏移量： (X 軸水平偏移平方 + y 軸水平偏移平方) 開根號
  return Math.sin((degree * PI) / 180) * length
}

function getYYYYMMDD() {
  let date = new Date()
  let year = date.getFullYear()
  let month =
    date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  let day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`
  return `${year}/${month}/${day}`
}

function getHHMMSS() {
  let date = new Date()
  let hour = date.getHours()
  let minute =
    date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`
  let second =
    date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}`
  return `${hour}:${minute}:${second}`
}
