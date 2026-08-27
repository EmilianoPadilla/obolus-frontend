import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import toast from 'react-hot-toast'
import apiFetch from '../api/client'
import { getCategories } from '../api/products'
import type { Product } from '../types'
import useAuthStore from '../store/authStore'

const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  price: z.number({ invalid_type_error: 'Price must be a number' }).min(1, 'Price must be at least 1'),
  stock: z.number({ invalid_type_error: 'Stock must be a number' }).min(0, 'Stock cannot be negative'),
  category_id: z.number({ invalid_type_error: 'Please select a category' }),
  image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
})

type ProductFormData = z.infer<typeof productSchema>

function MyProductsPage() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const { data: products, isLoading } = useQuery({
    queryKey: ['my-products'],
    queryFn: () => apiFetch<Product[]>('/products/?limit=100'),
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getCategories(),
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  })

  const { mutate: updateProduct } = useMutation({
    mutationFn: (data: ProductFormData) =>
      apiFetch<Product>(`/products/${editingProduct?.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...data,
          image_url: data.image_url || null,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-products'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product updated!')
      setEditingProduct(null)
      reset()
    },
    onError: () => {
      toast.error('Failed to update product!')
    },
  })

  function handleEditClick(product: Product) {
    setEditingProduct(product)
    reset({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category_id: 1,
      image_url: product.image_url || '',
    })
  }

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
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </Button>
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

      {/* Edit Dialog */}
      <div className="dark-overlay">
        <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent 
            overlayClassName="bg-black/5 backdrop-blur-xl " 
            className="ring-2 ring-blue-500"
          >
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit((data) => updateProduct(data))} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Product Name</label>
                <Input {...register('name')} className="mt-1" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Price ($)</label>
                <Input {...register('price', { valueAsNumber: true })} type="number" className="mt-1" />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Stock</label>
                <Input {...register('stock', { valueAsNumber: true })} type="number" className="mt-1" />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                  {...register('category_id', { valueAsNumber: true })}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {(categories ?? []).map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Image URL (optional)</label>
                <Input {...register('image_url')} placeholder="https://example.com/image.jpg" className="mt-1" />
                {errors.image_url && <p className="text-red-500 text-sm mt-1">{errors.image_url.message}</p>}
              </div>

              <div className="flex gap-4 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 cursor-pointer"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1 cursor-pointer">
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default MyProductsPage