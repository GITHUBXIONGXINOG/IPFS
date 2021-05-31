import Vue from 'vue'
import VueRouter from 'vue-router'
// import Status from '../views/status'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/files'
  },
  // {
  //   path: '/status',
  //   name: 'Status',
  //   component: Status
  // },
  {
    path: '/files',
    name: 'Files',
    component: () => import('../views/files')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
