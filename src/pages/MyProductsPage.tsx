import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import toast from 'react-hot-toast'
import apiFetch from '../api/client'
import type { Product } from '../types'
import useAuthStore from '../store/authStore'

function MyProductsPage() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()

  const { data: products, isLoading } = useQuery({
    queryKey: ['my-products'],
    queryFn: () => apiFetch<Product[]>('/products/?limit=100'),
  })

  const { mutate: deleteProduct } = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/products/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-products'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product deleted!')
    },
    onError: () => {
      toast.error('Failed to delete product!')
    },
  })

  const myProducts = products?.filter(
    (p) => p.owner_username === user?.username
  )

  if (isLoading) return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Products</h1>
        <Link to="/sell">
          <Button className="cursor-pointer">Add New Product</Button>
        </Link>
      </div>

      {!myProducts?.length ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">You haven't listed any products yet!</p>
          <Link to="/sell">
            <Button className="cursor-pointer">List your first product</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {myProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="flex items-center gap-4 py-4">
                <img
                  src={product.image_url || `https://placehold.co/100x100?text=${product.name}`}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h2 className="font-bold text-gray-800">{product.name}</h2>
                  <p className="text-blue-600 font-semibold">${product.price}</p>
                  <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
                </div>

                <div className="flex gap-2">
                  <Link to={`/products/${product.id}`}>
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      View
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyProductsPage