export interface User {
  id: number
  username: string
  email: string
}

export interface UserCreate {
  username: string
  email: string
  password: string
}

export interface Product {
  id: number
  name: string
  price: number
  stock: number
  image_url: string | null
}

export interface ProductCreate {
  name: string
  price: number
  stock: number
  category_id: number
}

export interface Category {
  id: number
  name: string
}

export interface CategoryCreate {
  name: string
}

export interface Order {
  id: number
  total: number
  purchased_on: string
  user_id: number
}

export interface OrderCreate {
  total: number
  purchased_on: string
}

export interface OrderItem {
  id: number
  quantity: number
  unit_price: number
  order_id: number
  product_id: number
}

export interface OrderItemCreate {
  quantity: number
  unit_price: number
  order_id: number
  product_id: number
}

export interface AuthResponse {
  access_token: string
  token_type: string
}

export interface LoginCredentials {
  username: string
  password: string
}