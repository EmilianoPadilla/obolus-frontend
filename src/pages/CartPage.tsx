import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import toast from 'react-hot-toast'
import { getCart, updateCartItem, removeFromCart, clearCartApi} from '../api/cart'

function CartPage() {
  const queryClient = useQueryClient()

  const { data: items, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  })

  const { mutate: increment } = useMutation({
    mutationFn: ({ item_id, quantity }: { item_id: number; quantity: number }) =>
      updateCartItem(item_id, quantity + 1),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })

  const { mutate: decrement } = useMutation({
    mutationFn: ({ item_id, quantity }: { item_id: number; quantity: number }) =>
      updateCartItem(item_id, quantity - 1),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })

  const { mutate: remove } = useMutation({
    mutationFn: (item_id: number) => removeFromCart(item_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Item removed from cart!')
    },
  })

  const { mutate: clear } = useMutation({
    mutationFn: clearCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Cart cleared!')
    },
  })

  if (isLoading) return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  )

  if (!items?.length) return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
      <p className="text-gray-500 mb-8">Add some products to get started!</p>
      <Link to="/products">
        <Button className="cursor-pointer">Browse Products</Button>
      </Link>
    </div>
  )

  const total = items.reduce(
    (sum, item) => sum + item.product_price * item.quantity, 0
  )

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-center gap-4 py-4">
              <img
                src={item.product_image_url || `https://placehold.co/100x100?text=${item.product_name}`}
                alt={item.product_name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="font-bold text-gray-800">{item.product_name}</h2>
                <p className="text-blue-600 font-semibold">${item.product_price}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => decrement({ item_id: item.id, quantity: item.quantity })}
                >
                  -
                </Button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => increment({ item_id: item.id, quantity: item.quantity })}
                >
                  +
                </Button>
              </div>

              <p className="font-semibold w-20 text-right">
                ${item.product_price * item.quantity}
              </p>

              <Button
                variant="destructive"
                size="sm"
                className="cursor-pointer"
                onClick={() => remove(item.id)}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-gray-800">Total:</span>
          <span className="text-2xl font-bold text-blue-600">${total}</span>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => clear()}
          >
            Clear Cart
          </Button>
          <Button className="cursor-pointer">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartPage