/** @format */

import Vue from 'vue'
import Router from 'vue-router'

import Entry from './views/Entry.vue'
import UserInfo from './views/UserInfo.vue'
import Users from './views/Users.vue'
import UserCreate from './views/UserCreate.vue'
import UserEdit from './views/UserEdit.vue'
import Companies from './views/Companies.vue'
import PermissionSetup from './views/PermissionSetup.vue'
import ProjectsSetting from './views/ProjectsSetting.vue'
import Projects from './views/Projects.vue'
import ProjectCreate from './views/ProjectCreate.vue'
import ProjectEdit from './views/ProjectEdit.vue'
import ProjectMonitor from './views/ProjectMonitor.vue'
import ProjectPhaseList from './views/ProjectPhaseList.vue'
import VGItems from './views/VGItems.vue'
import SteelCreate from './views/SteelCreate.vue'
import SteelEdit from './views/SteelEdit.vue'
import Steels from './views/Steels.vue'
import SOItems from './views/SOItems.vue'
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
        store.dispatch('getMe').then(() => next())
      }
    },
    {
      path: '/companies',
      name: 'Companies',
      component: Companies,
      meta: {
        requireAuth: true
      },
      beforeEnter: (to, from, next) => {
        store.dispatch('fetchCompanies').then(() => next())
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: {
        requireAuth: true
      },
      beforeEnter: (to, from, next) => {
        Promise.all([store.dispatch('getUsers')]).then(() => next())
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
          store.dispatch('fetchCompanies'),
          store.dispatch('fetchSOItems'),
          store.dispatch('fetchrolePermissions')
        ])
          .then(() => {
            if (from.path !== '/companies') {
              return store.dispatch('fetchUser', to.params.userId)
            } else return Promise.resolve()
          })
          .then(() => next())
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
          store.dispatch('fetchCompanies'),
          store.dispatch('fetchSOItems'),
          store.dispatch('fetchrolePermissions')
        ])
          .then(() => {
            if (from.path !== '/companies') {
              return store.dispatch('fetchUser', to.params.userId)
            } else return Promise.resolve()
          })
          .then(() => next())
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
          store.dispatch('fetchPermissions'),
          store.dispatch('fetchrolePermissions')
        ]).then(() => next())
      }
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        store.dispatch('fetchProjects').then(() => next())
      }
    },
    {
      path: '/projects-setting',
      name: 'ProjectsSetting',
      component: ProjectsSetting,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        store.dispatch('fetchProjects').then(() => next())
      }
    },
    {
      path: '/project-create',
      name: 'ProjectCreate',
      component: ProjectCreate,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        Promise.all([
          store.dispatch('fetchCompanies'),
          store.dispatch('getMe'),
          store.dispatch('getUsers'),
          store.dispatch('fetchVGItems'),
          store.dispatch('fetchSteels')
        ])
          .then(() => {
            if (from.path !== '/steels')
              return store.dispatch('newProject', to.params.projectId)
            else return Promise.resolve()
          })
          .then(() => next())
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
          store.dispatch('fetchCompanies'),
          store.dispatch('getUsers'),
          store.dispatch('fetchVGItems'),
          store.dispatch('fetchSteels')
        ])
          .then(() => {
            if (from.path !== '/steels')
              return store.dispatch('fetchProject', to.params.projectId)
            else return Promise.resolve()
          })
          .then(() => next())
      }
    },
    {
      path: '/project-monitor/:projectId',
      name: 'ProjectMonitor',
      component: ProjectMonitor,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        store.dispatch('fetchProject', to.params.projectId).then(() => next())
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
          store.dispatch('fetchProject', to.params.projectId),
          store.dispatch('getMe'),
          store.dispatch('fetchProjectPhases')
        ]).then(() => {
          if (store.getters.me.soItem) {
            store.dispatch('fetchSOItem', store.getters.me.soItem.id)
          }
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
        store.dispatch('fetchProjectPhases').then(() => next())
      }
    },
    {
      path: '/vg-items',
      name: 'VGItems',
      component: VGItems,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        store.dispatch('fetchVGItems').then(() => next())
      }
    },
    {
      path: '/steels',
      name: 'Steels',
      component: Steels,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        store.dispatch('fetchSteels').then(() => next())
      }
    },
    {
      path: '/steel/:steelId',
      name: 'SteelEdit',
      component: SteelEdit,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        if (!store.getters.steels.length) {
          store
            .dispatch('fetchSteels')
            .then(() => {
              return store.dispatch('fetchSteel', to.params.steelId)
            })
            .then(() => next())
        } else {
          store.dispatch('fetchSteel', to.params.steelId).then(() => next())
        }
      }
    },
    {
      path: '/steel',
      name: 'SteelCreate',
      component: SteelCreate,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        store.dispatch('fetchSteel').then(() => next())
      }
    },
    {
      path: '/so-items',
      name: 'SOItems',
      component: SOItems,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        store.dispatch('fetchSOItems').then(() => next())
      }
    },
    {
      path: '/so-item-create',
      name: 'SOItemCreate',
      component: SOItemCreate,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        Promise.all([
          store.dispatch('fetchSOItems'),
          store.dispatch('fetchSOModels')
        ])
          .then(() => {
            return store.dispatch('fetchSOItem')
          })
          .then(() => next())
      }
    },
    {
      path: '/so-item/:soId',
      name: 'SOItemEdit',
      component: SOItemEdit,
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        Promise.all([
          store.dispatch('fetchSOItem', to.params.soId),
          store.dispatch('fetchSOModels')
        ]).then(() => next())
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.getters.isLogined) {
    cookies.reloadLogin()
  }
  if (store.getters.isLogined && to.path === '/') {
    next({ name: 'Projects' })
  } else if (!store.getters.isLogined && to.meta.requireAuth) {
    next({
      name: 'Entry'
    })
  }
  if (!store.getters.me.name) {
    store
      .dispatch('getMe')
      .then(() => {})
      .then(() => next())
  }

  next()
})

export default router
