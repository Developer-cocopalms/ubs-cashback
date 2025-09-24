<template>
  <div class="min-h-screen grid place-items-center bg-gradient-to-br from-slate-50 to-slate-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-card ring-1 ring-slate-100 p-8">
      <div class="flex items-center gap-2 mb-6">
        <div class="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500" />
        <h1 class="text-lg font-semibold">UBS Admin</h1>
      </div>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm text-slate-600 mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full text-sm text-slate-950 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-sm text-slate-600 mb-1">Password</label>
          <input v-model="password" type="password" required class="w-full border text-sm text-slate-950 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button :disabled="loading" class="w-full py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">Login</button>
      </form>
      <p v-if="error" class="text-sm text-red-600 mt-3">{{ error }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/useAuthStore'

const router = useRouter()
const auth = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function onSubmit(){
  loading.value = true
  error.value = ''
  try{
    console.log('Attempting login...')
    await auth.login(email.value, password.value)
    console.log('Login successful, token:', auth.token)
    console.log('Is authenticated:', auth.isAuthenticated)
    
    if (auth.isAuthenticated) {
      console.log('Redirecting to dashboard...')
      await router.push('/admin/dashboard')
      console.log('Navigation completed')
    } else {
      throw new Error('Authentication failed - no token stored')
    }
  }catch(e:any){
    console.error('Login error:', e)
    console.error('Error details:', {
      status: e?.response?.status,
      statusText: e?.response?.statusText,
      data: e?.response?.data,
      message: e?.message
    })
    
    if (e?.response?.status === 500) {
      error.value = 'Server error - please check your login credentials and try again'
    } else {
      error.value = e?.response?.data?.message || e.message || 'Login failed'
    }
  }finally{
    loading.value = false
  }
}
</script>