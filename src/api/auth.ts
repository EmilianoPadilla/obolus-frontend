import apiFetch from './client'
import type { AuthResponse } from '../types'

export const loginUser = (username: string, password: string) => {
  const formData = new URLSearchParams()
  formData.append('username', username)
  formData.append('password', password)

  return fetch(`${import.meta.env.VITE_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  }).then((res) => {
    if (!res.ok) throw new Error('Invalid credentials')
    return res.json() as Promise<AuthResponse>
  })
}

export const registerUser = (username: string, email: string, password: string) =>
  apiFetch<{ id: number; username: string; email: string }>('/users/', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  })