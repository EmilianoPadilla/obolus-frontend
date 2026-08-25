import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/products'
import { Skeleton } from '@/components/ui/skeleton'
import type { Product } from '../types'

function ProductsPage() {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'], //unique key for the query and cache
    queryFn: () => getProducts(), //function that fetches the data (data is stored and retrieved using this key)
  })

  if (isLoading) return ( //show loading skeletons while the data is being fetched
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )

  if (isError) return ( //show error message if the data fetching fails
    <p className="text-red-500 text-center">Failed to load products!</p>
  )

  if (!products?.length) return ( //show message if there are no products available
    <div className="text-center py-16">
      <p className="text-gray-500 text-lg">No products available yet.</p>
    </div>
  )

  return ( //display the list of products in a grid layout
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.image_url || `https://placehold.co/400x300?text=${product.name}`} //If image_url is null → show a placeholder with the product name
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold text-lg text-gray-800">{product.name}</h2>
              <p className="text-blue-600 font-semibold mt-2">${product.price}</p>
              <p className="text-gray-500 text-sm mt-1">Stock: {product.stock}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductsPage