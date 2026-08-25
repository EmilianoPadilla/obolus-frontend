import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { registerUser } from '../api/auth'

const registerSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type RegisterFormData = z.infer<typeof registerSchema>

function RegisterPage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const { mutate: registerMutation } = useMutation({
    mutationFn: (data: RegisterFormData) =>
      registerUser(data.username, data.email, data.password),
    onSuccess: () => {
      toast.success('Account created successfully! Please log in.', { position: 'top-right'})
      navigate('/login')
    },
    onError: () => {
      toast.error('Registration failed. Email or username may already exist.', { position: 'top-right'})
    },
  })

  function onSubmit(data: RegisterFormData) {
    registerMutation(data)
  }

  return (
    <div className="max-w-md mx-auto py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <Input
                {...register('username')}
                placeholder="Your username"
                className="mt-1"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

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
                placeholder="Min 8 characters"
                className="mt-1"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="mt-2">
              {isSubmitting ? 'Creating account...' : 'Register'}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterPage