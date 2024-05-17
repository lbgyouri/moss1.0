import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}
 

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/matrix',
    name: 'matrix',
    component: () => import('@/views/Matrix/Matrix.vue'),
 
  },
  {
    path: '/robot/:id',
    name: 'robot',
    component: () => import('@/views/robot.vue'),
 
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('@/views/Manage.vue'),
 
  },
  {
    path: '/plantdetail',
    name: 'plantdetail',
    component: () => import('@/views/Matrix/PlantDetail.vue'),
    redirect: {
      name: 'fengji'
    },
    children:[
      {
        path: '/matrix/fengji',
        name: 'fengji',
        component: () => import('@/views/Matrix/fengji.vue')
      },
      {
        path: '/matrix/timeData',
        name: 'timeData',
        component: () => import('@/views/Matrix/timeData.vue')
      },
      {
        path:'/matrix/Failurewarning',
        name:'failurewarning',
        component: () => import('@/views/Matrix/Failurewarning.vue')
      },
      {
        path:'/matrix/streetMap',
        name:'streetmap',
        component: () => import('@/views/Matrix/streetMap.vue')
      },
      {
        path:'/matrix/Boost',
        name:'boost',
        component: () => import('@/views/Matrix/Boost.vue')
      },
      {
        path:'/matrix/Tower',
        name:'tower',
        component: () => import('@/views/Matrix/Tower.vue')
      },
      {
        path:'/matrix/Watch',
        name:'watch',
        component: () => import('@/views/Matrix/Watch.vue')
      },
      {
        path:'/matrix/Forecast',
        name:'forecast',
        component: () => import('@/views/Matrix/Forecast.vue')
      },
    ]
  },
  {
    path: '/fault',
    name: 'fault',
    component: () => import('@/views/Fault/Fault.vue'),
    redirect:{name:'query'},
    children:[
      {
        path: '/fault/query',
        name: 'query',
        component: () => import('@/views/Fault/FaultQuery.vue')
      },
      {
        path: '/fault/analyse',
        name: "analyse",
        component: () => import('@/views/Fault/FaultAnalyse.vue')
      },
      {
        path: '/fault/total',
        name: "total",
        component: () => import('@/views/Fault/FaultTotal.vue')
      },
     
    ]
  },
  {
    path: '/performance',
    name: 'performance',
    component: () => import('@/views/Performance.vue')
  },
  {
    path: '/warning',
    name: 'warning',
    component: () => import('@/views/Warning.vue')
  },
 
  {
    path: '/kpi',
    name: 'kpi',
    component: () => import('@/views/Kpi.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
