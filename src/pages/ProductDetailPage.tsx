import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getProduct } from '../api/products'
import { addToCart } from '../api/cart'
import toast from 'react-hot-toast'

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(Number(id)),
    enabled: !!id,
  })

  const { mutate: addToCartMutation } = useMutation({
    mutationFn: () => addToCart(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success(`${product?.name} added to cart!`)
    },
    onError: () => {
      toast.error('Failed to add to cart. Please login first!')
    },
  })

  if (isLoading) return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      <Skeleton className="w-full md:w-96 h-80" />
      <div className="flex flex-col gap-4 flex-1">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )

  if (isError) return (
    <p className="text-red-500 text-center">Failed to load product!</p>
  )

  if (!product) return (
    <p className="text-center text-gray-500">Product not found!</p>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image_url || `https://placehold.co/400x300?text=${product.name}`}
          alt={product.name}
          className="w-full md:w-96 h-80 object-cover rounded-lg shadow-md"
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl text-blue-600 font-semibold">${product.price}</p>
          <p className="text-gray-500">
            {product.stock > 0
              ? `${product.stock} in stock`
              : 'Out of stock'}
          </p>
          <p className="text-gray-500 text-sm">
            Sold by: <span className="font-medium">{product.owner_username || 'Obolus'}</span>
          </p>

          <Button
            onClick={() => addToCartMutation()}
            disabled={product.stock === 0}
            className="w-fit cursor-pointer"
          >
            {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage