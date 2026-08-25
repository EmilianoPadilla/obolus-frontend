import apiFetch from './client'

export interface CartItemWithProduct {
  id: number
  user_id: number
  product_id: number
  quantity: number
  product_name: string
  product_price: number
  product_image_url: string | null
}

export const getCart = () =>
  apiFetch<CartItemWithProduct[]>('/cart/')

export const addToCart = (product_id: number, quantity = 1) =>
  apiFetch<{ id: number }>('/cart/', {
    method: 'POST',
    body: JSON.stringify({ product_id, quantity }),
  })

export const updateCartItem = (item_id: number, quantity: number) =>
  apiFetch<{ id: number }>(`/cart/${item_id}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  })

export const removeFromCart = (item_id: number) =>
  apiFetch<{ message: string }>(`/cart/${item_id}`, {
    method: 'DELETE',
  })

export const clearCartApi = () =>
  apiFetch<{ message: string }>('/cart/', {
    method: 'DELETE',
  })