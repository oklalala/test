/** @format */
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import store from '@/store'

Vue.use(VueCookies)

export default {
  saveLogin: function() {
    VueCookies.set('token', store.getters.token)
    VueCookies.set('userId', store.getters.myId)
    VueCookies.set('role', store.getters.myRole)
    VueCookies.set('permissions', store.getters.myPermissions)
  },
  reloadLogin: function() {
    store.commit('setToken', VueCookies.get('token'))
    store.commit('setMyId', VueCookies.get('userId'))
    store.commit('setMyRole', VueCookies.get('role'))
    store.commit('setMyPermissions', VueCookies.get('permissions'))
  },
  clear: function() {
    VueCookies.set('token', null)
    VueCookies.set('userId', null)
    VueCookies.set('role', null)
    VueCookies.set('permissions', null)
    VueCookies.remove('token')
    VueCookies.remove('userId')
    VueCookies.remove('role')
    VueCookies.remove('permissions')
  }
}
