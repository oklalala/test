import axios from 'axios'

let wiseConfig = {
  user: "root",
  password: "0000",
  wiseIP: ""
}
let steps = [
  initStatus,
  turnOnPowerDo, turnSoDoOn, readVo,
  turnSoDoOff, turnSoDoOn, readElt,
  turnOffPowerDo,
  computeAndShowData
];
// methods , url_path , data

export default function(wiseIP, formData) {
  wiseConfig.wiseIP = "http://" + wiseIP
  requestMeasuresSo("get", wiseConfig.wiseIP).then(res => {
    console.log(res.data)
  })
  formData.push("fuck")
}

function requestMeasuresSo(method, url) {
  let headers = {
    Accept: 'application/json',
    Authorization: makeBasicAuth(wiseConfig.user, wiseConfig.password)
  }
  //
  // if (isAuth) {
  //   headers['x-access-token'] = store.getters.token
  // }

  let configs = {
    baseURL: url,
    headers
  }

  return axios.create(configs)[method]("/ai_value/slot_0/ch_0")
}

function makeBasicAuth(user, password) {
  var tok = user + ':' + password;
  var hash = window.btoa(tok);
  return "Basic " + hash;
}