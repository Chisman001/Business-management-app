// ─── Order Status Enum ───────────────────────────────────────────────────────
export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const

export type OrderStatus = (typeof ORDER_STATUSES)[number]

// ─── Textile Product Enums ───────────────────────────────────────────────────
// Update these arrays with your actual product names and categories
export const PRODUCT_NAMES = [
  "Plain Cotton Fabric",
  "Polyester Blend",
  "Silk Fabric",
  "Denim Fabric",
  "Linen Fabric",
  "Wool Fabric",
  "Chiffon Fabric",
  "Satin Fabric",
] as const

export const PRODUCT_CATEGORIES = [
  "Natural Fibers",
  "Synthetic Fibers",
  "Blended Fabrics",
  "Specialty Fabrics",
  "Outerwear Materials",
  "Lining Materials",
] as const

export type ProductName = (typeof PRODUCT_NAMES)[number]
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

// ─── Database Row Types ──────────────────────────────────────────────────────
export type Product = {
  id: string
  name: string
  price: number
  category: string
  stock_quantity: number
  created_at: string
}

export type Order = {
  id: string
  product_name: string
  price: number
  quantity: number
  category: string
  customer_id: string | null
  status: OrderStatus
  created_at: string
}

export type Customer = {
  id: string
  name: string
  phone_number: string
  created_at: string
}

// ─── Action Return Types ─────────────────────────────────────────────────────
export type ActionResult = {
  error?: string
  success?: boolean
}
