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
      async beforeEnter(to, from, next) {
        await store.dispatch('getMe')
        next()
      }
    },
    {
      path: '/companies',
      name: 'Companies',
      component: Companies,
      meta: {
        requireAuth: true
      },
      async beforeEnter(to, from, next) {
        await store.dispatch('fetchCompanies')
        next()
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: {
        requireAuth: true
      },
      async beforeEnter(to, from, next) {
        await Promise.all([store.dispatch('getUsers')])
        next()
      }
    },
    {
      path: '/user-create',
      name: 'UserCreate',
      component: UserCreate,
      meta: {
        requireAuth: true
      },
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('getRoles'),
          store.dispatch('fetchCompanies'),
          store.dispatch('fetchSOItems'),
          store.dispatch('fetchrolePermissions')
        ])
        if (from.path !== '/companies') {
          await store.dispatch('fetchUser', to.params.userId)
        } else {
          await Promise.resolve()
        }
        next()
      }
    },
    {
      path: '/user/:userId',
      name: 'UserEdit',
      component: UserEdit,
      meta: { requireAuth: true },
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('getRoles'),
          store.dispatch('fetchCompanies'),
          store.dispatch('fetchSOItems'),
          store.dispatch('fetchrolePermissions')
        ])
        if (from.path !== '/companies') {
          await store.dispatch('fetchUser', to.params.userId)
        } else {
          await Promise.resolve()
        }
        next()
      }
    },
    {
      path: '/permisson-setup',
      name: 'PermissionSetup',
      component: PermissionSetup,
      meta: {
        requireAuth: true
      },
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('fetchPermissions'),
          store.dispatch('fetchrolePermissions')
        ])
        next()
      }
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
      meta: { requireAuth: true },
      async beforeEnter(to, from, next) {
        await store.dispatch('fetchProjects')
        next()
      }
    },
    {
      path: '/projects-setting',
      name: 'ProjectsSetting',
      component: ProjectsSetting,
      meta: { requireAuth: true },
      async beforeEnter(to, from, next) {
        await store.dispatch('fetchProjects')
        next()
      }
    },
    {
      path: '/project-create',
      name: 'ProjectCreate',
      component: ProjectCreate,
      meta: { requireAuth: true },
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('fetchCompanies'),
          store.dispatch('getMe'),
          store.dispatch('getUsers'),
          store.dispatch('fetchVGItems'),
          store.dispatch('fetchSteels')
        ])
        if (from.path !== '/steels')
          await store.dispatch('newProject', to.params.projectId)
        else await Promise.resolve()

        next()
      }
    },
    {
      path: '/project/:projectId',
      name: 'ProjectEdit',
      component: ProjectEdit,
      meta: { requireAuth: true },
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('getMe'),
          store.dispatch('fetchCompanies'),
          store.dispatch('getUsers'),
          store.dispatch('fetchVGItems'),
          store.dispatch('fetchSteels')
        ])
        if (from.path !== '/steels')
          await store.dispatch('fetchProject', to.params.projectId)
        else await Promise.resolve()

        next()
      }
    },
    {
      path: '/project-monitor/:projectId',
      name: 'ProjectMonitor',
      component: ProjectMonitor,
      meta: { requireAuth: true },
      async beforeEnter(to, from, next) {
        await store.dispatch('fetchProject', to.params.projectId)
        next()
      }
    },
    {
      path: '/measures/so/:projectId',
      name: 'MeasuresSo',
      component: MeasuresSo,
      meta: {
        requireAuth: true
      },
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('fetchProject', to.params.projectId),
          store.dispatch('getMe'),
          store.dispatch('fetchProjectPhases')
        ])
        if (store.getters.me.soItem) {
          store.dispatch('fetchSOItem', store.getters.me.soItem.id)
        }
        next()
      }
    },
    {
      path: '/project-phases',
      name: 'ProjectPhaseList',
      component: ProjectPhaseList,
      meta: { requireAuth: true },
      async beforeEnter(to, from, next) {
        await store.dispatch('fetchProjectPhases')
        next()
      }
    },
    {
      path: '/vg-items',
      name: 'VGItems',
      component: VGItems,
      meta: { requireAuth: true },
      async beforeEnter(to, from, next) {
        await store.dispatch('fetchVGItems')
        next()
      }
    },
    {
      path: '/steels',
      name: 'Steels',
      component: Steels,
      meta: { requireAuth: true },
      async beforeEnter(to, from, next) {
        await store.dispatch('fetchSteels')
        next()
      }
    },
    {
      path: '/steel/:steelId',
      name: 'SteelEdit',
      component: SteelEdit,
      meta: { requireAuth: true },
      async beforeEnter(to, from, next) {
        if (!store.getters.steels.length) {
          await store.dispatch('fetchSteels')
          await store.dispatch('fetchSteel', to.params.steelId)
          next()
        } else {
          await store.dispatch('fetchSteel', to.params.steelId)
          next()
        }
      }
    },
    {
      path: '/steel',
      name: 'SteelCreate',
      component: SteelCreate,
      meta: { requireAuth: true },
      async beforeEnter(to, from, next) {
        await store.dispatch('fetchSteel')
        next()
      }
    },
    {
      path: '/so-items',
      name: 'SOItems',
      component: SOItems,
      meta: { requireAuth: true },
      async beforeEnter(to, from, next) {
        await store.dispatch('fetchSOItems')
        next()
      }
    },
    {
      path: '/so-item-create',
      name: 'SOItemCreate',
      component: SOItemCreate,
      meta: { requireAuth: true },
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('fetchSOItems'),
          store.dispatch('fetchSOModels')
        ])
        await store.dispatch('fetchSOItem')
        next()
      }
    },
    {
      path: '/so-item/:soId',
      name: 'SOItemEdit',
      component: SOItemEdit,
      meta: { requireAuth: true },
      async beforeEnter(to, from, next) {
        await Promise.all([
          store.dispatch('fetchSOItem', to.params.soId),
          store.dispatch('fetchSOModels')
        ])
        next()
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach(async (to, from, next) => {
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
    await store.dispatch('getMe')
    next()
  }

  next()
})

export default router
