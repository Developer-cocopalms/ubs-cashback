import { defineStore } from 'pinia'
import type { Transaction } from '../types'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({ list: [] as Transaction[] }),
})
