import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { loginUser } from '../api/auth'
import useAuthStore from '../store/authStore'
import { getMe } from '../api/users'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const { mutate: loginMutation } = useMutation({
  mutationFn: (data: LoginFormData) =>
    loginUser(data.email, data.password),
  onSuccess: async (data) => {
    // save token first so getMe can use it
    localStorage.setItem('token', data.access_token)
    
    // fetch real user data
    const user = await getMe()
    
    // store user and token in Zustand
    login(user, data.access_token)
    
    toast.success(`Welcome back, ${user.username}!`)
    navigate('/products')
  },
  onError: () => {
    toast.error('Invalid email or password!')
  },
})

  function onSubmit(data: LoginFormData) {
    loginMutation(data)
  }

  return (
    <div className="max-w-md mx-auto py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                {...register('email')}
                placeholder="your@email.com"
                className="mt-1"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                {...register('password')}
                placeholder="Your password"
                className="mt-1"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="mt-2 cursor-pointer">
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage