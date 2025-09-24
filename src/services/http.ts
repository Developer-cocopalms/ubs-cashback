import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://wallet-backend-axau.onrender.com',
  withCredentials: true,
})

// Attach token if present
api.interceptors.request.use((config)=>{
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null
  if(token){
    config.headers = config.headers || {}
    ;(config.headers as any)['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Helper to extract token from headers AND response body
function extractToken(response: any){
  // Try headers first
  const headers = response.headers || {}
  const h = (name: string) => headers[name] || headers[name.toLowerCase()]
  const auth = h('authorization') as string | undefined
  let token = auth?.replace(/Bearer\s+/i,'') || h('access-token') || h('x-access-token')
  
  // Try response body if not in headers
  if (!token && response.data) {
    token = response.data.token || response.data.Token || response.data.access_token
  }
  
  return token as string | undefined
}

// Refresh on 401 with better logging
let refreshing = false
let queue: Array<() => void> = []

api.interceptors.response.use(
  (res) => {
    console.log(`✅ API Success: ${res.config.method?.toUpperCase()} ${res.config.url} - Status: ${res.status}`)
    return res
  },
  async (error) => {
    const status = error?.response?.status
    const url = error?.config?.url
    
    console.log(`❌ API Error: ${error.config?.method?.toUpperCase()} ${url} - Status: ${status}`)
    
    if (status === 401 && !refreshing) {
      console.log('🔄 Got 401, attempting refresh token...')
      refreshing = true
      
      try {
      
        const refreshUrl = api.defaults.baseURL + '/api/tenet/auth/refresh'
        console.log('🔄 Calling refresh endpoint:', refreshUrl)
        
        const resp = await axios.post(refreshUrl, undefined, { withCredentials: true })
        const token = extractToken(resp)
        
        if (token) {
          console.log('✅ Refresh successful, got new token')
          localStorage.setItem('access_token', token)
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          // Process queued requests
          queue.forEach(fn => fn())
          queue = []
          refreshing = false
          
          // Retry the original request
          console.log('🔄 Retrying original request...')
          return api(error.config)
        } else {
          console.log('❌ Refresh failed: No token in response')
          throw new Error('No token received from refresh')
        }
      } catch (refreshError) {
        console.log('❌ Refresh failed:', refreshError)
        refreshing = false
        queue = []
        localStorage.removeItem('access_token')
        delete api.defaults.headers.common['Authorization']
        
        // Redirect to login if refresh fails
        window.location.href = '/login'
      }
    } else if (status === 401 && refreshing) {
      console.log(' Refresh in progress, queuing request...')
      // Queue the request while refresh is in progress
      await new Promise<void>((resolve) => queue.push(resolve))
      return api(error.config)
    }
    
    return Promise.reject(error)
  }
)