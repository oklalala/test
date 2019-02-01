/** @format */

import Vue from 'vue'
import Router from 'vue-router'
import localStore from 'store'

import Entry from './views/Entry.vue'
import UserInfo from './views/UserInfo.vue'
import UserList from './views/UserList.vue'
import CreateUser from './views/CreateUser.vue'
import EditUser from './views/EditUser.vue'
import CompanyList from './views/CompanyList.vue'
import PermissionSetup from './views/PermissionSetup.vue'
import ProjectSetting from './views/ProjectSetting.vue'
import ProjectList from './views/ProjectList.vue'
import ProjectCreate from './views/ProjectCreate.vue'
import ProjectEdit from './views/ProjectEdit.vue'
import ProjectMonitor from './views/ProjectMonitor.vue'
import ProjectPhaseList from './views/ProjectPhaseList.vue'
// import ProjectPhaseCreate from './views/ProjectPhaseCreate.vue'
// import ProjectPhaseEdit from './views/ProjectPhaseEdit.vue'
import VGList from './views/VGList.vue'
import SteelList from './views/SteelList.vue'
import SOItemList from './views/SOItemList.vue'
import SOItemCreate from './views/SOItemCreate.vue'
import SOItemEdit from './views/SOItemEdit.vue'
import MeasuresSo from './views/MeasuresSo.vue'

import store from '@/store'

Vue.use(Router)

let router = new Router({
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
      meta: {
        requireAuth: true
      },
      beforeEnter: (to, from, next) => {
        store.dispatch('getMe').then(() => {
          next()
        })
      }
    },
    {
      path: '/company-list',
      name: 'CompanyList',
      component: CompanyList,
      meta: {
        requireAuth: true
      },
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
      meta: {
        requireAuth: true
      },
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
      meta: {
        requireAuth: true
      },
      beforeEnter: (to, from, next) => {
        Promise.all([
          store.dispatch('getRoles'),
          store.dispatch('getCompanies'),
          store.dispatch('getSOItems'),
          store.dispatch('getRolesPermissions')
        ]).then(() => {
          next()
        })
      }
    },
    {
      path: '/edit-user/:userId',
      name: 'EditUser',
      component: EditUser,
      meta: { requireAuth: true },
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
      meta: {
        requireAuth: true
      },
      beforeEnter: (to, from, next) => {
        Promise.all([
          store.dispatch('getPermissions'),
          store.dispatch('getRolesPermissions')
        ]).then(() => {
          next()
        })
      }
    },
    {
      path: '/project-list',
      name: 'ProjectList',
      component: ProjectList,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        store.dispatch('getProjects').then(() => {
          next()
        })
      }
    },
    {
      path: '/project-setting',
      name: 'ProjectSetting',
      component: ProjectSetting,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        store.dispatch('getProjects').then(() => {
          next()
        })
      }
    },
    {
      path: '/project-create',
      name: 'ProjectCreate',
      component: ProjectCreate,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        Promise.all([
          store.dispatch('getCompanies'),
          store.dispatch('getMe'),
          store.dispatch('getUsers'),
          store.dispatch('getVGs'),
          store.dispatch('getSteels')
        ]).then(() => {
          next()
        })
      }
    },
    {
      path: '/project-edit/:projectId',
      name: 'ProjectEdit',
      component: ProjectEdit,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        Promise.all([
          store.dispatch('getCompanies'),
          store.dispatch('getMe'),
          store.dispatch('getUsers'),
          store.dispatch('getVGs'),
          store.dispatch('getSteels')
        ]).then(() => {
          next()
        })
      }
    },
    {
      path: '/project-monitor/:projectId',
      name: 'ProjectMonitor',
      component: ProjectMonitor,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        Promise.all([
          // store.dispatch('getProjectStatus'),
          // store.dispatch('getProject'),
          // store.dispatch('getCompanies')
        ]).then(() => {
          next()
        })
      }
    },
    {
      path: '/measures/so/:projectId',
      name: 'MeasuresSo',
      component: MeasuresSo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/project-phase-list',
      name: 'ProjectPhaseList',
      component: ProjectPhaseList,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        Promise.all([store.dispatch('getProjectPhases')]).then(() => {
          next()
        })
      }
    },
    {
      path: '/vg-list',
      name: 'VGList',
      component: VGList,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        Promise.all([store.dispatch('getVGs')]).then(() => {
          next()
        })
      }
    },
    {
      path: '/steel-list',
      name: 'SteelList',
      component: SteelList,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        Promise.all([store.dispatch('getSteels')]).then(() => {
          next()
        })
      }
    },
    {
      path: '/soItem-list',
      name: 'SOItemList',
      component: SOItemList,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        store.dispatch('getSOItems').then(() => {
          next()
        })
      }
    },
    {
      path: '/soItem-create',
      name: 'SOItemCreate',
      component: SOItemCreate,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        Promise.all([
          store.dispatch('getSOItems'),
          store.dispatch('getSOModels')
        ]).then(() => {
          next()
        })
      }
    },
    {
      path: '/soItem-edit/:soId',
      name: 'SOItemEdit',
      component: SOItemEdit,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        Promise.all([
          // store.dispatch('getSOItem'),
          store.dispatch('getSOModels')
        ]).then(() => {
          next()
        })
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requireAuth) next()

  if (store.getters.token) {
    next()
  } else if (localStore.get('ground_monitor_token')) {
    let data = localStore.get('ground_monitor_token')
    store.commit('setToken', data.token)
    store.commit('setMyId', data.myId)
    store.commit('setMyRole', data.myRole)
    store.commit('setMyPermissions', data.myPermissions)
    next()
  } else {
    next({
      name: 'Entry'
    })
  }
})

export default router
