import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/dashboard',
    children: [
      {
        path: 'article',
        name: 'article',
        component: () => import('../views/article.vue'),
        meta: {
          title: ['面经后台', '面经管理']
        }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard.vue'),
        meta: {
          title: ['欢迎页']
        }
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (token && to.path == '/login') {
    next('/')
  }
  else if (!token && to.path != '/login') {
    next('/login');
  }
  else {
    next();
  }
})
export default router
