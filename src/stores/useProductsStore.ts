import { defineStore } from 'pinia'
import type { Product } from '../types'

export const useProductsStore = defineStore('products', {
  state: () => ({
    list: [
      { id:1, car:'Bmw M4', model:2022, trim:'Prime', service:'Chauffeur', duration:'One Month', price:3000 },
      { id:2, car:'Porsche 911', model:2024, trim:'Prime', service:'Self-Drive', duration:'8 hours', price:200 },
    ] as Product[],
  }),
})
