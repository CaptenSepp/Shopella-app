import type { Order, OrderCustomer } from './types' // order types
import type { Product } from '@/features/products/services' // product type for cart
import { getAccessToken } from '@/features/auth/auth-service'

type CartItem = Product & { quantity: number } // cart item shape

const viteEnv = import.meta.env
const nextApiBase = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_ORDERS_API_BASE_URL : undefined
const API_BASE = (viteEnv?.VITE_ORDERS_API_BASE_URL ?? nextApiBase ?? '').replace(/\/$/, '') // optional deploy base
const endpoint = (path: string) => `${API_BASE}${path}` // build full endpoint URL

const readErrorMessage = async (response: Response, fallback: string) => {
  try {
    const body = await response.json() as { message?: string }
    return body.message || fallback
  } catch {
    return fallback
  }
}

export const createOrder = async (items: CartItem[], customer: OrderCustomer): Promise<Order> => { // create order via API
  const accessToken = await getAccessToken()
  const res = await fetch(endpoint('/api/orders'), { // request config
    method: 'POST', // HTTP method
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }, // authenticated JSON body
    body: JSON.stringify({ items: items.map(({ id, quantity }) => ({ id, quantity })), customer: { name: customer.name, address: customer.address } }), // send only values the server needs
  }) // POST order payload
  if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to create order.')) // handle error
  return res.json() as Promise<Order> // return order data
}

export const getOrders = async (): Promise<Order[]> => { // load orders via API
  const accessToken = await getAccessToken()
  const res = await fetch(endpoint('/api/orders'), { headers: { Authorization: `Bearer ${accessToken}` } }) // GET private orders
  if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to fetch orders.')) // handle error
  return res.json() as Promise<Order[]> // return orders list
}
