import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/order/index'),
      meta: { title: '流水查询', icon: 'dashboard' }
    }]
  },
  {
    path: '/refund-manage',
    component: Layout,
    redirect: '/refund-manage',
    children: [
      {
        path: '/refund-manage',
        name: 'RefundManage',
        component: () => import('@/views/refund/index'),
        meta: { title: '退费管理', icon: 'refund' }
      }
    ]
  },
  {
    path: '/settlement',
    component: Layout,
    redirect: '/settlement',
    children: [
      {
        path: '/settlement',
        name: 'SettlementManage',
        component: () => import('@/views/settlement/index'),
        meta: { title: '财务结算', icon: 'refund' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
