<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-lg font-semibold">Recent Transactions</h1>
      <RouterLink to="/admin/programs/create" class="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">+ Program</RouterLink>
    </div>

    <div class="bg-white rounded-2xl p-5 shadow-card ring-1 ring-slate-100">
      <div class="flex items-center gap-3 mb-4">
        <label class="text-sm text-slate-600">Filter Date</label>
        <input type="date" class="border rounded-md px-2 py-1" />
        <div class="relative">
          <span class="pointer-events-none absolute left-2 top-1.5 text-slate-400">🔍</span>
          <input v-model="q" type="text" class="border rounded-md pl-7 pr-3 py-1" placeholder="Search..." />
        </div>
        <div class="ml-auto">
          <button class="px-3 py-2 text-sm rounded-md border">Download Csv</button>
        </div>
      </div>
      <div class="overflow-hidden rounded-xl border border-slate-200">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-blue-100 text-left text-slate-700">
              <th class="px-3 py-2">Name</th>
              <th class="px-3 py-2">Minimum Amt</th>
              <th class="px-3 py-2">Cashback %</th>
              <th class="px-3 py-2">Expiry</th>
              <th class="px-3 py-2">Multiple User</th>
              <th class="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in filtered" :key="p.id" class="border-t hover:bg-slate-50/60">
              <td class="px-3 py-2">{{ p.name }}</td>
              <td class="px-3 py-2">{{ p.minimum }} kwd</td>
              <td class="px-3 py-2">{{ p.percent }}%</td>
              <td class="px-3 py-2">{{ p.expiry }}</td>
              <td class="px-3 py-2">
                <span class="inline-flex h-3 w-3 rounded-sm" :class="p.multi ? 'bg-green-500' : 'bg-slate-300'" />
              </td>
              <td class="px-3 py-2">
                <div class="flex items-center gap-2 text-slate-600">
                  <button title="Refresh" class="hover:text-blue-600">⟳</button>
                  <button title="Edit" class="hover:text-blue-600">✎</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex items-center justify-between pt-3 text-sm text-slate-600">
        <div class="flex items-center gap-2">
          <button class="px-2 py-1 rounded border">«</button>
          <button class="px-2 py-1 rounded border bg-blue-600 text-white">1</button>
          <button class="px-2 py-1 rounded border">2</button>
          <button class="px-2 py-1 rounded border">»</button>
        </div>
        <div>Page <span class="font-medium">1</span> of <span class="font-medium">10</span></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const q = ref('')
const programs = ref([
  { id: 1, name: 'Diamond 20%', minimum: 10, percent: 10, expiry: '12-08-25 | 11:25 pm', multi: true },
  { id: 2, name: 'Bronze 10%', minimum: 8, percent: 10, expiry: '12-08-25 | 11:25 pm', multi: false },
  { id: 3, name: 'Gold 15%', minimum: 22, percent: 10, expiry: '12-08-25 | 11:25 pm', multi: true },
])
const filtered = computed(() => programs.value.filter(p=> p.name.toLowerCase().includes(q.value.toLowerCase())))
</script>
