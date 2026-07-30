import { useQuery } from '@tanstack/react-query'
import { getCategories, getProductById, getProducts, Product, Category } from './services'

export function useProducts() {
  // A stable key lets every product grid share the same cached catalog.
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: ({ signal }) => getProducts(signal),
    placeholderData: []
  })
}

export function useProductById(id: number) {
  // Include the id in the key so detail pages cache independently.
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: ({ signal }) => getProductById(id, signal),
    placeholderData: undefined,
  })
}

export const useCategories = () => {
  // Categories use their own cache because filters can load before products.
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: ({ signal }) => getCategories(signal),
    placeholderData: []
  })
}

