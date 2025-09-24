import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({ items: [] as { id: number; message: string }[] }),
  actions: { push(message: string){ this.items.push({ id: Date.now(), message }) } },
})
