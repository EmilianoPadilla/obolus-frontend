import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">Page not found</h2>
      <p className="text-gray-500 mt-2 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
        Go Home
      </Link>
    </div>
  )
}

export default NotFoundPage