/** @format */

import Vue from 'vue'
import Router from 'vue-router'

import Entry from './views/Entry.vue'
import UserInfo from './views/UserInfo.vue'
import UserList from './views/UserList.vue'
import UserCreate from './views/UserCreate.vue'
import UserEdit from './views/UserEdit.vue'
import CompanyList from './views/CompanyList.vue'
import PermissionSetup from './views/PermissionSetup.vue'
import ProjectSetting from './views/ProjectSetting.vue'
import ProjectList from './views/ProjectList.vue'
import ProjectCreate from './views/ProjectCreate.vue'
import ProjectEdit from './views/ProjectEdit.vue'
import ProjectMonitor from './views/ProjectMonitor.vue'
import ProjectPhaseList from './views/ProjectPhaseList.vue'
import VGList from './views/VGList.vue'
import SteelList from './views/SteelList.vue'
import SOItemList from './views/SOItemList.vue'
import SOItemCreate from './views/SOItemCreate.vue'
import SOItemEdit from './views/SOItemEdit.vue'
import MeasuresSo from './views/MeasuresSo.vue'
import store from '@/store'
import cookies from '@/cookies'
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
      path: '/companies',
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
      path: '/users',
      name: 'UserList',
      component: UserList,
      meta: {
        requireAuth: true
      },
      beforeEnter: (to, from, next) => {
        Promise.all([
          store.commit('setUser', {}),
          store.dispatch('getUsers')
        ]).then(() => {
          next()
        })
      }
    },
    {
      path: '/user-create',
      name: 'UserCreate',
      component: UserCreate,
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
      path: '/user/:userId',
      name: 'UserEdit',
      component: UserEdit,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        Promise.all([
          store.dispatch('getRoles'),
          store.dispatch('getCompanies'),
          store.dispatch('getSOItems'),
          store.dispatch('getRolesPermissions')
        ])
          .then(() => {
            if (from.path !== '/companies') {
              return store.dispatch('getUser', to.params.userId)
            } else return Promise.resolve()
          })
          .then(() => {
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
      path: '/projects',
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
      path: '/project/:projectId',
      name: 'ProjectEdit',
      component: ProjectEdit,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        Promise.all([
          store.dispatch('getMe'),
          store.dispatch('getCompanies'),
          store.dispatch('getUsers'),
          store.dispatch('getVGs'),
          store.dispatch('getSteels')
        ])
          .then(() => {
            if (from.path !== '/steels') {
              return store.dispatch('getProject', to.params.projectId)
            } else return Promise.resolve()
          })
          .then(() => {
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
        Promise.all([store.dispatch('getProject', to.params.projectId)]).then(
          () => {
            next()
          }
        )
      }
    },
    {
      path: '/measures/so/:projectId',
      name: 'MeasuresSo',
      component: MeasuresSo,
      meta: {
        requireAuth: true
      },
      beforeEnter: (to, from, next) => {
        Promise.all([
          store.dispatch('getProject', to.params.projectId),
          store.dispatch('getMe'),
          store.dispatch('getProjectPhases')
        ]).then(() => {
          next()
        })
      }
    },
    {
      path: '/project-phases',
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
      path: '/vgs',
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
      path: '/steels',
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
      path: '/so-items',
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
      path: '/soItem/:soId',
      name: 'SOItemEdit',
      component: SOItemEdit,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        Promise.all([store.dispatch('getSOModels')]).then(() => {
          next()
        })
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.getters.isLogined) {
    cookies.reloadLogin()
  }
  if (store.getters.isLogined && to.path === '/') {
    next({ name: 'ProjectList' })
  } else if (!store.getters.isLogined && to.meta.requireAuth) {
    next({
      name: 'Entry'
    })
  }

  next()
})

export default router
