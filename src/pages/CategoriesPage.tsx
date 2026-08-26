import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { getCategories } from '../api/products'

function CategoriesPage() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })

  if (isLoading) return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full rounded-xl" />
      ))}
    </div>
  )

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories?.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-shadow duration-300 hover:bg-blue-50"
          >
            <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
            <p className="text-blue-500 text-sm mt-2">Browse products →</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage