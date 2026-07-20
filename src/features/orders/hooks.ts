import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createOrder, getOrders } from "./services"

export const orderQueryKey = ["orders"] as const

export const useOrders = (enabled: boolean) => useQuery({
  queryKey: orderQueryKey,
  queryFn: getOrders,
  enabled,
  retry: 1,
})

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: Parameters<typeof createOrder>) => createOrder(...input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: orderQueryKey }),
  })
}
