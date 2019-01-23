/** @format */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeLine from 'v-charts/lib/line.common'
import './plugins/element.js'
import '@/assets/scss/custom-theme.scss'

import {
  Row,
  Col,
  Menu,
  MenuItem,
  Button,
  Form,
  FormItem,
  Select,
  Option,
  Input,
  Table,
  TableColumn,
  Checkbox,
  Dialog,
  Message,
  tabPane,
  tabs,
  Pagination,
  upload,
  submenu,
  tag
} from 'element-ui'

Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Checkbox)
Vue.use(Dialog)
Vue.use(tabPane)
Vue.use(tabs)
Vue.use(Pagination)
Vue.use(upload)
Vue.use(submenu)
Vue.use(tag)
Vue.prototype.$message = Message

Vue.config.productionTip = false

Vue.component(VeLine.name, VeLine)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
