<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">
    <div class="flex">
      <!-- Sidebar -->
      <aside :class="['hidden md:flex flex-col border-r border-slate-200 bg-white/80 backdrop-blur-sm transition-all duration-200', collapsed ? 'md:w-20' : 'md:w-64']">
        <div class="h-16 flex items-center gap-2 px-5 border-b border-slate-100">
          <div class="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500" />
          <span v-if="!collapsed" class="font-semibold tracking-wide">UBS</span>
          <button class="ml-auto p-2 rounded hover:bg-slate-100 hidden md:inline-flex" @click="collapsed = !collapsed" :title="collapsed ? 'Expand' : 'Collapse'">
            <svg v-if="!collapsed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4"><path d="M15 6l-6 6 6 6"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>
        <nav class="flex-1 py-4 space-y-1">
          <RouterLink v-for="item in items" :key="item.to" :to="item.to">
            <div :title="collapsed ? item.label : ''" :class="[
                'flex items-center gap-3 mx-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                collapsed ? 'justify-center' : '',
                isItemActive(item.to) ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
              ]">
              <span class="i" v-html="item.icon" />
              <span v-if="!collapsed" class="flex-1">{{ item.label }}</span>
            </div>
          </RouterLink>
        </nav>
      </aside>

      <!-- Main -->
      <div class="flex-1 min-w-0">
        <!-- Topbar -->
        <header class="h-16 sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200 flex items-center">
          <button class="md:hidden ml-3 rounded p-2 hover:bg-slate-100" @click="open = !open" aria-label="Open Menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <div class="px-4 text-slate-500">Dashboards</div>
          <button class="hidden md:inline-flex rounded p-2 hover:bg-slate-100" @click="collapsed = !collapsed" :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'">
            <svg v-if="!collapsed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path d="M15 6l-6 6 6 6"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path d="M9 6l6 6-6 6"/></svg>
          </button>
          <div class="ml-auto pr-4 flex items-center gap-4 text-sm">
            <span class="hidden sm:block text-slate-500">Admin</span>
            <svg class="h-8 w-8 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
          </div>
        </header>

        <main class="p-4 md:p-6 lg:p-8">
          <router-view />
        </main>
      </div>
    </div>

    <!-- Mobile drawer -->
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-30 bg-black/30 md:hidden" @click="open=false" />
    </transition>
    <transition name="slide">
      <aside v-if="open" class="fixed z-40 inset-y-0 left-0 w-72 bg-white border-r border-slate-200 p-4 md:hidden">
        <div class="flex items-center justify-between h-12 mb-4">
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500" />
            <span class="font-semibold tracking-wide">UBS</span>
          </div>
          <button class="p-2 rounded hover:bg-slate-100" @click="open=false" aria-label="Close Menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <nav class="space-y-1">
          <RouterLink v-for="item in items" :key="item.to" :to="item.to" class="group flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-100" @click="open=false">
            <span class="i" v-html="item.icon" />
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>
      </aside>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const open = ref(false)
const collapsed = ref(false)
const route = useRoute()

function isItemActive(to: string){
  return route.path === to || route.path.startsWith(to + '/')
}

onMounted(()=>{
  const v = localStorage.getItem('admin_sidebar_collapsed')
  collapsed.value = v === '1'
})
watch(collapsed, v=> localStorage.setItem('admin_sidebar_collapsed', v ? '1' : '0'))

const items = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>' },
  { label: 'Programs', to: '/admin/programs', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path d="M4 4h16v4H4zM4 10h16v10H4z"/></svg>' },
  { label: 'Products', to: '/admin/products', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path d="M4 7l8-4 8 4-8 4-8-4zm0 10l8 4 8-4M4 12l8 4 8-4"/></svg>' },
  { label: 'Roles', to: '/admin/roles', icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path d="M16 11c1.657 0 3-1.79 3-4s-1.343-4-3-4-3 1.79-3 4 1.343 4 3 4zM8 13c-2.21 0-4 1.79-4 4v3h8v-3c0-2.21-1.79-4-4-4zM16 13c-1.1 0-2 .9-2 2v5h6v-5c0-1.1-.9-2-2-2z"/></svg>' },
  { label: 'Customers', to: '/admin/customers', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6-5 2.686-5 6 2.239 6 5 6zm0 2c-4.418 0-8 2.686-8 6v2h16v-2c0-3.314-3.582-6-8-6z"/></svg>' },
  { label: 'Report', to: '/admin/reports', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path d="M3 3h18v4H3zM3 9h18v12H3z"/></svg>' },
  { label: 'Notification', to: '/admin/notifications', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path d="M12 22c1.1 0 2-.9 2-2H10c0 1.1.9 2 2 2zm6-6V9c0-3.07-1.63-5.64-4.5-6.32V2h-3v.68C7.63 3.36 6 5.92 6 9v7l-2 2v1h16v-1l-2-2z"/></svg>' },
]
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:opacity .2s}
.fade-enter-from,.fade-leave-to{opacity:0}
.slide-enter-active,.slide-leave-active{transition:transform .25s}
.slide-enter-from,.slide-leave-to{transform:translateX(-100%)}
.i{width:20px;height:20px;color:currentColor}
.router-link-active{background-color:transparent}
.router-link-exact-active{font-weight:600}
</style>
