import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/products'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import type { Product } from '../types'

function ProductsPage() {
  const [search, setSearch] = useState('')

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(100),
  })

  const filtered = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  if (isLoading) return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )

  if (isError) return (
    <p className="text-red-500 text-center">Failed to load products!</p>
  )

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64"
        />
      </div>

      {filtered.length === 0 && search ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products found for "{search}"</p>
          <button
            onClick={() => setSearch('')}
            className="text-blue-500 hover:underline mt-2"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product: Product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image_url || `https://placehold.co/400x300?text=${product.name}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-gray-800">{product.name}</h2>
                <p className="text-blue-600 font-semibold mt-1">${product.price}</p>
                <p className="text-gray-500 text-sm mt-1">Stock: {product.stock}</p>
                <p className="text-gray-400 text-xs mt-1">by {product.owner_username || 'Obolus'}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsPage