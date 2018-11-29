/** @format */

import localStore from 'store'

var mixin = {
  computed: {
    isLogined() {
      return localStore.get('ground_monitor_token')
    }
  }
}

export default mixin
