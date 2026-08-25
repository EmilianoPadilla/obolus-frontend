import apiFetch from './client'
import type { Product, ProductCreate, Category, CategoryCreate } from '../types'

// products
export const getProducts = (limit = 10, offset = 0) =>
  apiFetch<Product[]>(`/products/?limit=${limit}&offset=${offset}`)

export const getProduct = (id: number) =>
  apiFetch<Product>(`/products/${id}`)

export const createProduct = (data: ProductCreate) =>
  apiFetch<Product>('/products/', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const deleteProduct = (id: number) =>
  apiFetch<{ message: string }>(`/products/${id}`, {
    method: 'DELETE',
  })

// categories
export const getCategories = (limit = 10, offset = 0) =>
  apiFetch<Category[]>(`/categories/?limit=${limit}&offset=${offset}`)

export const getCategory = (id: number) =>
  apiFetch<Category>(`/categories/${id}`)

export const createCategory = (data: CategoryCreate) =>
  apiFetch<Category>('/categories/', {
    method: 'POST',
    body: JSON.stringify(data),
  })