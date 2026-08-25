import apiFetch from './client'
import type { User, UserCreate } from '../types'

export const getMe = () =>
  apiFetch<User>('/users/me')

export const getUsers = (limit = 10, offset = 0) =>
  apiFetch<User[]>(`/users/?limit=${limit}&offset=${offset}`)

export const getUser = (id: number) =>
  apiFetch<User>(`/users/${id}`)

export const createUser = (data: UserCreate) =>
  apiFetch<User>('/users/', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const deleteUser = (id: number) =>
  apiFetch<{ message: string }>(`/users/${id}`, {
    method: 'DELETE',
  })