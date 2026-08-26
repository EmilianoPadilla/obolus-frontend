import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import apiFetch from '../api/client'
import type { Product, Category } from '../types'

function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data: category } = useQuery({
    queryKey: ['category', id],
    queryFn: () => apiFetch<Category>(`/categories/${id}`),
    enabled: !!id,
  })

  const { data: products, isLoading } = useQuery({
    queryKey: ['category-products', id],
    queryFn: () => apiFetch<Product[]>(`/categories/${id}/products`),
    enabled: !!id,
  })

  return (
    <div>
      <div className="flex items-center gap-2 mb-8">
        <Link to="/categories" className="text-blue-500 hover:underline">
          Categories
        </Link>
        <span className="text-gray-400">→</span>
        <h1 className="text-3xl font-bold text-gray-800">{category?.name}</h1>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : !products?.length ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products in this category yet!</p>
          <Link to="/sell" className="text-blue-500 hover:underline mt-2 inline-block">
            Be the first to sell here
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
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
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryDetailPage