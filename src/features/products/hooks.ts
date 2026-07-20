import { useQuery } from '@tanstack/react-query'
import { getCategories, getProductById, getProducts, Product, Category } from './services'

export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: ({ signal }) => getProducts(signal),
    placeholderData: []
  })
}

export function useProductById(id: number) {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: ({ signal }) => getProductById(id, signal),
    placeholderData: undefined,
  })
}

export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: ({ signal }) => getCategories(signal),
    placeholderData: []
  })
}

