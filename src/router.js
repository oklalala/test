/** @format */

import Vue from 'vue'
import Router from 'vue-router'
import Entry from './views/Entry.vue'
import UserInfo from './views/UserInfo.vue'
import ProjectList from './views/ProjectList.vue'
import UserList from './views/UserList.vue'
import CreateUser from './views/CreateUser.vue'
import CompanyList from './views/CompanyList.vue'
import PermissionSetup from './views/PermissionSetup.vue'

import store from '@/store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Entry',
      component: Entry
    },
    {
      path: '/user-info',
      name: 'UserInfo',
      component: UserInfo,
      beforeEnter: (to, from, next) => {
        store.dispatch('getMe').then(() => {
          next()
        })
      }
    },
    {
      path: '/project-list',
      name: 'ProjectList',
      component: ProjectList
    },
    {
      path: '/company-list',
      name: 'CompanyList',
      component: CompanyList,
      beforeEnter: (to, from, next) => {
        store.dispatch('getCompanies').then(() => {
          next()
        })
      }
    },
    {
      path: '/user-list',
      name: 'UserList',
      component: UserList,
      beforeEnter: (to, from, next) => {
        store.dispatch('getUsers').then(() => {
          next()
        })
      }
    },
    {
      path: '/create-user',
      name: 'CreateUser',
      component: CreateUser,
      beforeEnter: (to, from, next) => {
        Promise.all([
          store.dispatch('getRoles'),
          store.dispatch('getCompanies'),
          store.dispatch('getSOItems')
        ]).then(() => {
          next()
        })
      }
    },
    {
      path: '/permisson-setup',
      name: 'PermissionSetup',
      component: PermissionSetup,
      beforeEnter: (to, from, next) => {
        store.dispatch('getRolePermissions').then(() => {
          next()
        })
      }
    }
  ]
})
