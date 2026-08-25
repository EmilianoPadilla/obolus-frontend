import apiFetch from './client'
import type { Order, OrderCreate, OrderItem, OrderItemCreate } from '../types'

// orders
export const getOrders = (limit = 10, offset = 0) =>
  apiFetch<Order[]>(`/orders/?limit=${limit}&offset=${offset}`)

export const getOrder = (id: number) =>
  apiFetch<Order>(`/orders/${id}`)

export const createOrder = (data: OrderCreate) =>
  apiFetch<Order>('/orders/', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const deleteOrder = (id: number) =>
  apiFetch<{ message: string }>(`/orders/${id}`, {
    method: 'DELETE',
  })

// order items
export const getOrderItems = (limit = 10, offset = 0) =>
  apiFetch<OrderItem[]>(`/orderitems/?limit=${limit}&offset=${offset}`)

export const createOrderItem = (data: OrderItemCreate) =>
  apiFetch<OrderItem>('/orderitems/', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const deleteOrderItem = (id: number) =>
  apiFetch<{ message: string }>(`/orderitems/${id}`, {
    method: 'DELETE',
  })