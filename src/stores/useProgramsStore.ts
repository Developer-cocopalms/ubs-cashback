import { defineStore } from 'pinia'
import type { Program } from '../types'

export const useProgramsStore = defineStore('programs', {
  state: () => ({
    list: [
      { id: 1, name: 'Bronze 10%', minimum: 10, percent: 10, expiry: '12-08-25 | 11:25 pm', multi: true },
      { id: 2, name: 'Gold 15%', minimum: 22, percent: 15, expiry: '12-08-25 | 11:25 pm', multi: true },
    ] as Program[],
  }),
  actions: {
    add(p: Program){ this.list.push(p) },
    update(p: Program){ const i = this.list.findIndex(x=>x.id===p.id); if(i>-1) this.list[i]=p },
    remove(id: number){ this.list = this.list.filter(p=>p.id!==id) },
  }
})
