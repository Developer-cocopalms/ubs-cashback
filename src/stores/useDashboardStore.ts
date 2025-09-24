import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    kpis: {
      active: 7265,
      expiring: 3671,
      expired: 156,
      disabled: 2318,
    },
  }),
})
