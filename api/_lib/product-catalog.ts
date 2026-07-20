import { z } from "zod"

const catalogProductSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  price: z.number().nonnegative(),
  discountPercentage: z.number().min(0).max(100).default(0),
  stock: z.number().int().nonnegative(),
  brand: z.string().optional().default(""),
  category: z.string().optional().default(""),
  rating: z.number().optional().default(0),
})

export type CatalogProduct = z.infer<typeof catalogProductSchema>

const catalogBaseUrl = () => process.env.DUMMY_BASE_URL || "https://dummyjson.com"

export const getCatalogProduct = async (id: number): Promise<CatalogProduct> => {
  const response = await fetch(`${catalogBaseUrl()}/products/${id}`)
  if (!response.ok) throw new Error(`Product ${id} is unavailable.`)
  return catalogProductSchema.parse(await response.json())
}

export const getCatalogProducts = async (): Promise<CatalogProduct[]> => {
  const response = await fetch(`${catalogBaseUrl()}/products?limit=100`)
  if (!response.ok) throw new Error("The product catalogue is unavailable.")
  const body = z.object({ products: z.array(catalogProductSchema) }).parse(await response.json())
  return body.products
}
