export interface Program { id: number; name: string; minimum: number; percent: number; expiry: string; multi: boolean }
export interface Product { id: number; car: string; model: number; trim: string; service: string; duration: string; price: number }
export interface Transaction { id: string; date: string; cashback: string | number; paid: string | number; name: string; mobile: string; card: string }
export interface User { id: number; username: string; role: 'Admin' | 'Cashier' | 'Driver'; status: 'Active' | 'Disabled' }
