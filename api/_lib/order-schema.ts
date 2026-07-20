import { z } from "zod"

export const createOrderRequestSchema = z.object({
  items: z.array(z.object({
    id: z.coerce.number().int().positive(),
    quantity: z.coerce.number().int().min(1).max(99),
  })).min(1).max(30),
  customer: z.object({
    name: z.string().trim().min(2).max(100),
    address: z.string().trim().min(8).max(300),
  }),
})

export type CreateOrderRequest = z.infer<typeof createOrderRequestSchema>
