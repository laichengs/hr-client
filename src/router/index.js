import Vue from 'vue'
import Router from 'vue-router'
import Table from '@/pages/table/index'
import Home from '@/pages/index/index'
import User from '@/pages/user/index'
import Department from '@/pages/department/index'
import Job from '@/pages/job/index'
import City from '@/pages/city/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'table',
      component: Table
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/city',
      name: 'city',
      component: City
    },
    {
      path: '/department',
      name: 'department',
      component: Department
    },
    {
      path: '/job',
      name: 'job',
      component: Job
    }
  ]
})
