<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-lg font-semibold">Overview</h1>
      <select class="border rounded-md px-3 py-2 text-sm bg-white">
        <option>One Month</option>
        <option>Quarter</option>
        <option>Year</option>
      </select>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="(k,i) in kpis" :key="k.label" :class="['rounded-2xl p-5 shadow-card ring-1 ring-slate-100', k.bg]">
        <div class="text-slate-600 text-sm">{{ k.label }}</div>
        <div class="text-3xl font-semibold mt-1 tracking-tight">{{ k.value.toLocaleString() }}</div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="bg-white rounded-2xl p-5 shadow-card ring-1 ring-slate-100 lg:col-span-2">
        <h3 class="font-medium text-slate-700 mb-3">Cashback Amount Claimed</h3>
        <div class="h-[220px]"><Bar :data="barData" :options="barOpts" /></div>
      </div>
      <div class="bg-white rounded-2xl p-5 shadow-card ring-1 ring-slate-100">
        <h3 class="font-medium text-slate-700 mb-3">Cashback By Program</h3>
        <div class="h-[220px]"><Doughnut :data="pieData" :options="pieOpts" /></div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="bg-white rounded-2xl p-5 shadow-card ring-1 ring-slate-100 lg:col-span-2">
        <h3 class="font-medium text-slate-700 mb-3">Total Users</h3>
        <div class="h-[220px]"><Line :data="lineData" :options="lineOpts" /></div>
      </div>
      <div class="bg-white rounded-2xl p-5 shadow-card ring-1 ring-slate-100">
        <h3 class="font-medium text-slate-700 mb-3">Cashback Redeemed</h3>
        <div class="h-[220px]"><Doughnut :data="donutData" :options="donutOpts" /></div>
      </div>
    </div>

    <!-- Transactions -->
    <div class="bg-white rounded-2xl p-5 shadow-card ring-1 ring-slate-100">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-medium text-slate-700">Recent Transactions</h3>
        <button class="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700" @click="downloadCsv">Download CSV</button>
      </div>
      <div class="overflow-hidden rounded-xl border border-slate-200">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-blue-100 text-left text-slate-700">
              <th class="px-3 py-2">Transaction</th>
              <th class="px-3 py-2">Date & Time</th>
              <th class="px-3 py-2">Cashback Amount</th>
              <th class="px-3 py-2">Amount Paid</th>
              <th class="px-3 py-2">Name</th>
              <th class="px-3 py-2">Mobile</th>
              <th class="px-3 py-2">Card Number</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in rows" :key="t.id" class="border-t hover:bg-slate-50/60">
              <td class="px-3 py-2">#{{ t.id }}</td>
              <td class="px-3 py-2">{{ t.date }}</td>
              <td class="px-3 py-2">{{ t.cashback }}</td>
              <td class="px-3 py-2">{{ t.paid }}</td>
              <td class="px-3 py-2">{{ t.name }}</td>
              <td class="px-3 py-2">{{ t.mobile }}</td>
              <td class="px-3 py-2">{{ t.card }}</td>
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
import { computed } from 'vue'
import { Bar, Doughnut, Line } from 'vue-chartjs'
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import { toCsvAndDownload } from '../../utils/csv'

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend)

const kpis = [
  { label: 'Active Programs', value: 7265, bg: 'bg-indigo-50' },
  { label: 'Expiring Program', value: 3671, bg: 'bg-sky-50' },
  { label: 'Expired Program', value: 156, bg: 'bg-purple-50' },
  { label: 'Disabled Program', value: 2318, bg: 'bg-blue-50' },
]

const months = ['Jan','Feb','March','April','May','June']
const barData = computed(() => ({
  labels: months,
  datasets: [
    { label: 'A', backgroundColor: '#60a5fa', data: [12, 25, 21, 28, 10, 23] },
    { label: 'B', backgroundColor: '#0ea5e9', data: [8, 18, 14, 9, 12, 6] },
    { label: 'C', backgroundColor: '#a78bfa', data: [5, 7, 12, 6, 8, 11] },
    { label: 'D', backgroundColor: '#34d399', data: [10, 6, 8, 5, 7, 18] },
  ],
}))
const barOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }

const pieData = computed(() => ({
  labels: ['First20','Prime15','Bronze10','Other'],
  datasets: [{ data: [67,15,10,8], backgroundColor: ['#93c5fd','#60a5fa','#c4b5fd','#a7f3d0'] }],
}))
const pieOpts = { cutout: '0%', plugins: { legend: { position: 'right' as const } } }

const lineData = computed(() => ({
  labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
  datasets: [
    { label: 'Users', borderColor: '#94a3b8', backgroundColor: 'rgba(148,163,184,0.2)', tension: 0.4, data: [8,12,10,14,11,16,20], fill: true },
  ],
}))
const lineOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(148,163,184,0.15)' }, ticks: { callback: (v:number)=>`${v}k` } }, x: { grid: { display: false } } } }

const donutData = computed(() => ({
  labels: ['First Coupon','Prime20','Bronz15','Other'],
  datasets: [{ data: [52.1,22.8,13.9,11.2], backgroundColor: ['#86efac','#60a5fa','#c4b5fd','#94a3b8'] }],
}))
const donutOpts = { cutout: '72%', plugins: { legend: { position: 'right' as const } } }

const rows = computed(() => Array.from({ length: 14 }).map((_,i)=>({
  id: `TXN${String(i+1).padStart(3,'0')}`,
  date: '12-08-25 | 11:25 pm',
  cashback: i%2? '22 kwd':'10 kwd',
  paid: i%2? '340 kwd':'230 kwd',
  name: i%3===0?'John Doe': i%3===1? 'Michael':'Abraham',
  mobile: '+965 34543298',
  card: 'EC-23432',
})))

function downloadCsv(){
  const data = rows.value.map(r=>({Transaction: `#${r.id}`, DateTime: r.date, Cashback: r.cashback, Paid: r.paid, Name: r.name, Mobile: r.mobile, Card: r.card}))
  toCsvAndDownload(data, 'transactions.csv')
}
</script>
