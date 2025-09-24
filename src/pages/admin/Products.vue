<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-lg font-semibold">Products</h1>
      <button class="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">+ Product</button>
    </div>

    <div class="bg-white rounded-xl p-4 shadow-sm ring-1 ring-slate-100">
      <div class="flex items-center gap-3 mb-3">
        <label class="text-sm text-slate-600">Filter Date</label>
        <input type="date" class="border rounded-md px-2 py-1" />
        <div class="ml-auto flex items-center gap-2">
          <input v-model="q" type="text" class="border rounded-md px-3 py-1" placeholder="Search..." />
          <button class="px-3 py-2 text-sm rounded-md border">Download Csv</button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-left text-slate-600 border-b">
              <th class="px-3 py-2">Car</th>
              <th class="px-3 py-2">Model</th>
              <th class="px-3 py-2">Trim level</th>
              <th class="px-3 py-2">Service Type</th>
              <th class="px-3 py-2">Duration</th>
              <th class="px-3 py-2">Price</th>
              <th class="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in filtered" :key="p.id" class="border-b hover:bg-slate-50/60">
              <td class="px-3 py-2">{{ p.car }}</td>
              <td class="px-3 py-2">{{ p.model }}</td>
              <td class="px-3 py-2">{{ p.trim }}</td>
              <td class="px-3 py-2">{{ p.service }}</td>
              <td class="px-3 py-2">{{ p.duration }}</td>
              <td class="px-3 py-2">{{ p.price }} kwd</td>
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
      <div class="flex items-center justify-end gap-2 pt-3 text-sm text-slate-600">
        <button class="px-2 py-1 rounded border">«</button>
        <button class="px-2 py-1 rounded border bg-blue-600 text-white">1</button>
        <button class="px-2 py-1 rounded border">2</button>
        <button class="px-2 py-1 rounded border">»</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

const q = ref('')
const products = ref([
  { id:1, car:'Bmw M4', model:2022, trim:'Prime', service:'Chauffeur', duration:'One Month', price:3000 },
  { id:2, car:'Porsche 911', model:2024, trim:'Prime', service:'Self-Drive', duration:'8 hours', price:200 },
  { id:3, car:'Aston Martin', model:2021, trim:'Prime', service:'Chauffeur', duration:'One Day', price:3000 },
])
const filtered = computed(()=> products.value.filter(p=> `${p.car} ${p.model}`.toLowerCase().includes(q.value.toLowerCase())))
</script>
