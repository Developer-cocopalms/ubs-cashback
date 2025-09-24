import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import axios from 'axios'

const Dashboard = () => import('../pages/admin/Dashboard.vue')
const Programs = () => import('../pages/admin/Programs.vue')
const Products = () => import('../pages/admin/Products.vue')
const Placeholder = () => import('../components/shared/PlaceholderPage.vue')
const AdminLayout = () => import('../layouts/AdminLayout.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: () => import('../pages/auth/Login.vue') },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', name: 'admin-dashboard', component: Dashboard },
      { path: 'programs', name: 'admin-programs', component: Programs },
      { path: 'products', name: 'admin-products', component: Products },
      { path: 'programs/create', name: 'admin-programs-create', component: () => import('../pages/admin/ProgramCreate.vue') },
      { path: 'roles', name: 'admin-roles', component: Placeholder, props: { title: 'Roles' } },
      { path: 'customers', name: 'admin-customers', component: Placeholder, props: { title: 'Customers' } },
      { path: 'reports', name: 'admin-reports', component: Placeholder, props: { title: 'Reports' } },
      { path: 'notifications', name: 'admin-notifications', component: Placeholder, props: { title: 'Notifications' } },
      { path: 'users', redirect: '/admin/customers' },
    ],
  },
  { path: '/cashier', name: 'cashier', component: Placeholder, props: { title: 'Cashier / Driver' } },
  { path: '/client', name: 'client', component: Placeholder, props: { title: 'Client (PWA)' } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})


function extractToken(response: any){
  // Try headers first
  const headers = response.headers || {}
  const h = (name: string) => headers[name] || headers[name?.toLowerCase()]
  const auth = h('authorization') as string | undefined
  let token = (auth?.replace(/Bearer\s+/i,'') || h('access-token') || h('x-access-token')) as string | undefined
  
  // Try response body if not in headers
  if (!token && response.data) {
    token = response.data.token || response.data.Token || response.data.access_token
  }
  
  return token
}

router.beforeEach(async (to, _from, next) => {
  let token = typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null
  const needsAuth = to.path.startsWith('/admin')
  
  if (needsAuth && !token){
    try{
    
      const resp = await axios.post('https://wallet-backend-axau.onrender.com/api/tenet/auth/refresh', undefined, { withCredentials: true })
      const t = extractToken(resp)
      if(t){
        localStorage.setItem('access_token', t)
        token = t
      }
    }catch(error){
      console.log('Refresh token failed:', error)
    }
    if(!token) return next({ name: 'login' })
  }
  
  // Allow access to login page if explicitly requested with ?force=true or if token is invalid
  if ((to.name === 'login') && token && !to.query.force) {
    // Verify token is still valid before redirecting
    try {
      
      const tokenPayload = JSON.parse(atob(token.split('.')[1]))
      if (tokenPayload.exp * 1000 < Date.now()) {
        // Token expired, clear it and allow login
        localStorage.removeItem('access_token')
        return next()
      }
    } catch {
      // Invalid token format, clear it and allow login
      localStorage.removeItem('access_token')
      return next()
    }
    return next('/admin/dashboard')
  }
  next()
})

export default router