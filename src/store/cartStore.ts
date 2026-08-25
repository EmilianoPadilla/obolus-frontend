import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../types'

interface CartItem extends Product { //this means CartItem has everything Product has PLUS quantity
  quantity: number
}

interface CartStore { //Defines the shape of the entire store — both state AND functions
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (id: number) => void
  decrementItem: (id: number) => void
  clearCart: () => void
  total: () => number
  itemCount: () => number
}

const useCartStore = create<CartStore>()( //creates the store with persist middleware. Double parentheses ()() needed because of the middleware
  persist(
    (set, get) => ({
      items: [], //empty cart when app first loads

      addItem: (product: Product) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id
                  ? { ...i, quantity: i.quantity + 1 } //increments quantity +1 if item already exists in cart
                  : i //this is for the other items in the cart that are not the one being added. They remain unchanged
              ),
            }
          }
          return { items: [...state.items, { ...product, quantity: 1 }] }
        })
      },

      removeItem: (id: number) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id), //Removes item completely using filter — keeps everything EXCEPT the item with matching id
        }))
      },

      decrementItem: (id: number) => {
        set((state) => ({
          items: state.items
            .map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i) //Reduces quantity by 1 
            .filter((i) => i.quantity > 0), //then removes item if quantity reaches 0
        }))
      },

      clearCart: () => set({ items: [] }),

      total: () => get().items.reduce( //Calculates total price of all items in cart
        (sum, item) => sum + item.price * item.quantity, 0
      ),

      itemCount: () => get().items.reduce( //Calculates total number of items in cart
        (sum, item) => sum + item.quantity, 0
      ),
    }),
    {
      name: 'cart-storage', //The name of the key in localStorage (browser's storage) where the store will be saved.  The name is a label so localStorage knows where to save and read the data.
    }
  )
)

export default useCartStore