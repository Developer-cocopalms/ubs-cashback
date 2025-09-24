import { defineStore } from 'pinia'
import { api } from '../services/http'

interface User { name?: string; role?: 'Admin'|'Cashier'|'Driver' }
interface State { user: User | null; token: string | null }

export const useAuthStore = defineStore('auth', {
  state: (): State => ({ user: null, token: (typeof localStorage !== 'undefined' && localStorage.getItem('access_token')) || null }),
  getters: { isAuthenticated: (s) => !!s.token },
  actions: {
    async login(email: string, password: string){
      try {
        console.log('Making login request to:', '/api/tenet/login')
        console.log('Login payload:', { email, password: '***' })
        
        const res = await api.post('/api/tenet/login', { email, password })
        
        console.log('Login response status:', res.status)
        console.log('Login response headers:', res.headers)
        console.log('Login response data:', res.data)
        
        // First try to get token from headers
        const headers = res.headers as Record<string,string>
        let token = headers['authorization']?.replace(/Bearer\s+/i,'') || headers['access-token'] || headers['x-access-token'] || ''
        
        // If not in headers, try response body
        if (!token && res.data) {
          token = res.data.token || res.data.Token || res.data.access_token || ''
        }
        
        console.log('Extracted token:', token ? 'Token found' : 'No token found')
        
        if(token){
          this.token = token
          localStorage.setItem('access_token', token)
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          this.user = { name: email, role: 'Admin' }
        } else {
          throw new Error('Login request succeeded but no token was returned')
        }
      } catch (error: any) {
        console.error('Login API call failed:', error)
        console.error('Error response:', error.response?.data)
        console.error('Error status:', error.response?.status)
        
        // Re-throw the original error so the UI can handle it
        throw error
      }
    },
    async refresh(){
      const res = await api.post('/api/tenet/auth/refresh')
      const headers = res.headers as Record<string,string>
      let token = headers['authorization']?.replace(/Bearer\s+/i,'') || headers['access-token'] || headers['x-access-token'] || ''
      
      // Also try response body for refresh
      if (!token && res.data) {
        token = res.data.token || res.data.Token || res.data.access_token || ''
      }
      
      if(token){
        this.token = token
        localStorage.setItem('access_token', token)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        throw new Error('No token received from refresh')
      }
    },
    logout(){
      this.user = null
      this.token = null
      localStorage.removeItem('access_token')
      delete api.defaults.headers.common['Authorization']
    }
  },
})