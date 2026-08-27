import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import useAuthStore from '../store/authStore'
import { getCart } from '../api/cart'
import logo from '../assets/logo.png'
import { ShoppingCart } from 'lucide-react'

function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const { data: cartItems } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: !!user,
  })

  const itemCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0

  function handleLogout() {
    logout()
    queryClient.removeQueries({ queryKey: ['cart'] })
    navigate('/login')
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Obolus" className="h-8 w-auto" />
          <span className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
            Obolus
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {/* Cart — always visible */}
          <Link to="/cart" className="relative hover:text-gray-300 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {user && itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>

          {/* Desktop links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="hover:text-gray-300 transition-colors">Products</Link>
            <Link to="/categories" className="hover:text-gray-300 transition-colors">Categories</Link>

            {user && (
              <>
                <Link to="/sell" className="hover:text-gray-300 transition-colors">Sell</Link>
                <Link to="/my-products" className="hover:text-gray-300 transition-colors">My Products</Link>
              </>
            )}

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-300">Hi, {user.username}!</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white border-white hover:bg-gray-700 cursor-pointer"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
                <Button
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-gray-700 pt-4">
          <Link to="/products" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Products
          </Link>
          <Link to="/categories" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Categories
          </Link>

          {user && (
            <>
              <Link to="/sell" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
                Sell
              </Link>
              <Link to="/my-products" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
                My Products
              </Link>
            </>
          )}

          {user ? (
            <div className="flex flex-col gap-2"> 
              <span className="text-gray-300">Hi, {user.username}!</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { handleLogout(); setIsOpen(false) }}
                className="text-white border-white hover:bg-gray-700 cursor-pointer w-fit"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Button
                size="sm"
                onClick={() => { navigate('/register'); setIsOpen(false) }}
                className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar