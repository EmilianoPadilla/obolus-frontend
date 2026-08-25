import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCategories } from '../api/products'
import apiFetch from '../api/client'
import type { Product } from '../types'

const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  price: z.number({ invalid_type_error: 'Price must be a number' }).min(1, 'Price must be at least 1'),
  stock: z.number({ invalid_type_error: 'Stock must be a number' }).min(0, 'Stock cannot be negative'),
  category_id: z.number({ invalid_type_error: 'Please select a category' }),
  image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
})

type ProductFormData = z.infer<typeof productSchema>

function AddProductPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
        const result = await getCategories()
        return result
    },
    })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  })

  const { mutate: createProduct } = useMutation({
    mutationFn: (data: ProductFormData) =>
      apiFetch<Product>('/products/', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          image_url: data.image_url || null,
        }),
      }),
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product listed successfully!')
      navigate(`/products/${product.id}`)
    },
    onError: () => {
      toast.error('Failed to create product. Please try again.')
    },
  })

  function onSubmit(data: ProductFormData) {
    createProduct(data)
  }

  return (
    <div className="max-w-lg mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">List a Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Product Name</label>
              <Input
                {...register('name')}
                placeholder="e.g. Gaming Headset"
                className="mt-1"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Price ($)</label>
              <Input
                {...register('price', { valueAsNumber: true })}
                type="number"
                placeholder="e.g. 99"
                className="mt-1"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Stock</label>
              <Input
                {...register('stock', { valueAsNumber: true })}
                type="number"
                placeholder="e.g. 10"
                className="mt-1"
              />
              {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                {...register('category_id', { valueAsNumber: true })}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {(categories ?? []).map((cat) => (
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                </option>
                ))}
              </select>
              {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Image URL (optional)</label>
              <Input
                {...register('image_url')}
                placeholder="https://example.com/image.jpg"
                className="mt-1"
              />
              {errors.image_url && <p className="text-red-500 text-sm mt-1">{errors.image_url.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting} className="mt-2 cursor-pointer w-full">
              {isSubmitting ? 'Listing...' : 'List Product'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddProductPage