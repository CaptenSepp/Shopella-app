import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createOrder, getOrders } from "./services"

export const orderQueryKey = ["orders"] as const

export const useOrders = (enabled: boolean) => useQuery({
  // Protected pages disable this request until an authenticated user exists.
  queryKey: orderQueryKey,
  queryFn: getOrders,
  enabled,
  retry: 1,
})

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    // Forward the service arguments without duplicating its cart/customer types.
    mutationFn: (input: Parameters<typeof createOrder>) => createOrder(...input),
    // Refresh order history after checkout creates a new record.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: orderQueryKey }),
  })
}
