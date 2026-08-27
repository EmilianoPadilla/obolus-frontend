import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useAuthStore from '../store/authStore'
import { getCart } from '../api/cart'
import logo from '../assets/logo.png'
import { ShoppingCart, Search } from 'lucide-react'

function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

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

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`)
      setSearch('')
      setIsOpen(false)
    }
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="container mx-auto flex items-center gap-4">

        {/* Logo */}
        <div className="flex items-center gap-6 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Obolus" className="h-8 w-auto" />
            <span className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
              Obolus
            </span>
          </Link>
          {user && (
            <>
              <Link to="/my-products" className="hidden md:block hover:text-gray-300 transition-colors">
                My Products
              </Link>
              <Link to="/sell" className="hidden md:block hover:text-gray-300 transition-colors">
                Sell
              </Link>
            </>
          )}
        </div>

        {/* Search bar — center, hidden on mobile */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 items-center gap-2 bg-white rounded-md">
          <div className="relative w-full">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white text-gray-900 placeholder-gray-500 pr-10  border-r-1"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-3 bg-blue-400 hover:bg-blue-500 rounded-r-md transition-colors"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </form>

        {/* Right side */}
        <div className="flex items-center gap-4 ml-auto md:ml-0 shrink-0">

          {/* Cart — always visible when logged in */}
          {user && (
            <Link to="/cart" className="relative hover:text-gray-300 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          )}

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="hover:text-gray-300 transition-colors">Products</Link>
            <Link to="/categories" className="hover:text-gray-300 transition-colors">Categories</Link>

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
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-white text-gray-900"
            />
            <button type="submit" className="text-white">
              <Search className="w-5 h-5" />
            </button>
          </form>

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