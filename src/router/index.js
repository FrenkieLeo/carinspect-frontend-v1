import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes carmanage mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    // component: Layout,
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
      component: () => import('@/views/dashboard/index'),
      meta: { title: '面板', icon: 'dashboard' }
    }]
  },

  {
    path: '/basic',
    component: Layout,
    redirect: '/basic/drivers',
    name: 'basic',
    meta: { title: '基本信息', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'drivers',
        name: 'Drivers',
        component: () => import('@/views/drivers/index'),
        meta: { title: '驾驶员信息', icon: 'table' }
      },
      {
        path: 'vehicles',
        name: 'vehicles',
        component: () => import('@/views/vehicles/index'),
        meta: { title: '车辆信息', icon: 'tree' }
      }
    ]
  },
  {
    path: '/carmanage',
    component: Layout,
    redirect: '/carmanage/order',
    name: 'carmanage',
    meta: {
      title: '车辆管理',
      icon: 'table'
    },
    children: [
      {
        path: 'order',
        component: () => import('@/views/carmanage/order/index'),
        name: 'order',
        meta: { title: '订单管理' }
      },
      {
        path: 'etc',
        component: () => import('@/views/carmanage/etc/index'),
        name: 'etc',
        meta: { title: 'etc管理' }
      },
      {
        path: 'fuel',
        component: () => import('@/views/carmanage/fuel/index'),
        name: 'fuel',
        meta: { title: '燃油管理' }
      },
      {
        path: 'maintenance',
        component: () => import('@/views/carmanage/maintenance/index'),
        name: 'maintenance',
        meta: { title: '维保管理' }
      },
      {
        path: 'insurance',
        component: () => import('@/views/carmanage/insurance/index'),
        name: 'insurance',
        meta: { title: '保险管理' }
      },
      {
        path: 'illegal',
        component: () => import('@/views/carmanage/illegal/index'),
        name: 'illegal',
        meta: { title: '违章管理' }
      },
      {
        path: 'accidents',
        component: () => import('@/views/carmanage/accidents/index'),
        name: 'accidents',
        meta: { title: '事故管理' }
      },
      {
        path: 'annual',
        component: () => import('@/views/carmanage/annual/index'),
        name: 'annual',
        meta: { title: '年检管理' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'setting',
        component: () => import('@/views/setting/index'),
        meta: { title: '系统设置', icon: 'form' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
