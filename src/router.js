/** @format */

import Vue from 'vue'
import Router from 'vue-router'
import Entry from './views/Entry.vue'
import ProjectList from './views/ProjectList.vue'

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
      path: '/project-list',
      name: 'ProjectList',
      component: ProjectList
    }
  ]
})
