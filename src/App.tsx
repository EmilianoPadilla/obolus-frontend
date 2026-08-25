import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

// pages
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import PrivateRoute from './components/PrivateRoute'
import AddProductPage from './pages/AddProductPage'
import MyProductsPage from './pages/MyProductsPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50"> {/* makes the app take at least the full screen height with a light gray background */}
      <Navbar />
      <main className="container mx-auto px-4 py-8"> {/* Tailwind class that centers content and adds max width. Padding on x-axis 4 and y-axis 8 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<PrivateRoute> <CartPage /> </PrivateRoute> } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/sell" element={ <PrivateRoute> <AddProductPage /> </PrivateRoute> } />
          <Route path="/my-products" element={ <PrivateRoute> <MyProductsPage /> </PrivateRoute> }
/>
        </Routes>
      </main>
    </div>
  )
}

export default App