import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getProducts } from '../api/products'
import type { Product } from '../types'
import logo from '../assets/logo.png'

function ProductCard({ product, showBadge = false }: { product: Product, showBadge?: boolean }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="relative bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {showBadge && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
          Only {product.stock} left!
        </div>
      )}
      <img
        src={product.image_url || `https://placehold.co/400x300?text=${product.name}`}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-gray-800">{product.name}</h3>
        <p className="text-blue-600 font-semibold mt-1">${product.price}</p>
        <p className="text-gray-400 text-xs mt-1">by {product.owner_username || 'Obolus'}</p>
      </div>
    </Link>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}

function HomePage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(100),
  })

  const featuredProducts = products?.slice(0, 4) ?? []
  const lowStockProducts = products?.filter((p) => p.stock > 0 && p.stock < 3) ?? []

  return (
    <div className="flex flex-col gap-16">

      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white rounded-2xl px-8 pt-8 pb-8 text-center">
        <img src={logo} alt="Obolus" className="h-60 w-auto mx-auto mt-0 mb-6" />
        <h1 className="text-5xl font-bold mb-4">
          Buy and sell <span className="text-blue-400">anything!</span>
        </h1>
        <p className="text-gray-300 text-lg mb-4 max-w-xl mx-auto">
          Obolus is a marketplace where anyone can buy and sell products.
          Find great deals or start selling today!
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/products">
            <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer px-8 py-5 text-lg">
              Shop Now
            </Button>
          </Link>
          <Link to="/sell">
            <Button variant="outline" className="cursor-pointer px-8 py-5 text-lg text-white border-white hover:bg-gray-700">
              Start Selling
            </Button>
          </Link>
        </div>
        <p className="text-gray-300 text-xs mb-3 max-w-xl mx-auto mt-6 pb-0">
          This website is purely for educational purposes and is not intended for commercial use. <br />
          All products listed are only for demonstration purposes.
        </p>
        <p className="absolute bottom-3 right-4 text-xs text-gray-400">
          Developed by Emiliano Padilla
        </p>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <Link to="/products" className="text-blue-500 hover:underline text-sm">
            View all →
          </Link>
        </div>

        {isLoading ? (
          <ProductGridSkeleton />
        ) : featuredProducts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No products yet — be the first to sell!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Almost Gone Section */}
      {!isLoading && lowStockProducts.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Almost Gone</h2>
              <p className="text-gray-500 text-sm mt-1">Less than 3 left in stock — grab them before they're gone!</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lowStockProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} showBadge={true} />
            ))}
          </div>
        </section>
      )}

    </div>
  )
}

export default HomePage