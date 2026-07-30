import type { Product } from "@/features/products/services"

export type AdminProduct = Product & { updatedAt?: string }

export type AuditEntry = {
  id: string
  action: string
  product: string
  date: string
}

export const ADMIN_PRODUCTS_KEY = "shopella-admin-products"
export const ADMIN_AUDIT_KEY = "shopella-admin-audit"

export const readStoredValue = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

export const createAuditEntry = (action: string, product: string): AuditEntry => ({
  id: crypto.randomUUID(),
  action,
  product,
  date: new Date().toLocaleString(),
})
