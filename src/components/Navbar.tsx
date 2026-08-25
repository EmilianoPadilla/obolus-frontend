import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import useAuthStore from '../store/authStore'
import { getCart } from '../api/cart'

function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const { data: cartItems } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: !!user,  // only fetch cart when logged in
  })

  const itemCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
          Obolus
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/products" className="hover:text-gray-300 transition-colors">
            Products
          </Link>

          <Link to="/cart" className="relative hover:text-gray-300 transition-colors">
            Cart
            {user && itemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {user && (
            <> {/* using react fragment since I'm returning two elements (Sell and My Products) inside the {user && ...} condition. */}
              <Link to="/sell" className="hover:text-gray-300 transition-colors">
                Sell
              </Link>
              <Link to="/my-products" className="hover:text-gray-300 transition-colors">
                My Products
              </Link>
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
              <Link to="/login" className="hover:text-gray-300 transition-colors">
                Login
              </Link>
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
    </nav>
  )
}

export default Navbar