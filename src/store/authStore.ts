import { create } from 'zustand'
import { persist } from 'zustand/middleware' //automatically saves the store to localStorage so data survives page refreshes
import type { User } from '../types' //Imports the User TypeScript interface
import useCartStore from './cartStore'

//a store is just a file that holds data (state) that multiple components can access and update.
//Defines the shape of the entire store — both state AND functions.
interface AuthStore {
  user: User | null  //the logged in user object or null if not logged in
  token: string | null  //the JWT token or null if not logged in
  login: (user: User, token: string) => void //function to log in a user and set the token
  logout: () => void  //function to log out a user and clear the token
  isAuthenticated: () => boolean  //function to check if a user is logged in (if a token exists)
}


//Creates the store using Zustand's create function, and applies the persist middleware to automatically save the store to localStorage. ()() —  is needed when using middleware like persist.
const useAuthStore = create<AuthStore>()(
  persist(  //Wraps the store with persist middleware. Everything inside will be automatically saved to localStorage. set updates the store, get reads current state!
    (set, get) => ({
      user: null,  //Initial state
      token: null,

      login: (user: User, token: string) => {
        set({ user, token })
        localStorage.setItem('token', token) //saves token to localStorage separately so getHeaders() in client.ts can read it
      },

      logout: () => {
        set({ user: null, token: null })
        localStorage.removeItem('token')
        // clear cart on logout
        useCartStore.getState().clearCart()
      },

      isAuthenticated: () => !!get().token, //A helper function that returns true if token exists. the !! converts the token to a boolean (true if it exists, false if null)
    }), //This function is for protected routes — pages that should only be accessible when logged in.
    {
      name: 'auth-storage',  //The name of the key in localStorage (browser's storage) where the store will be saved.  The name is a label so localStorage knows where to save and read the data.
    }
  )
)

export default useAuthStore