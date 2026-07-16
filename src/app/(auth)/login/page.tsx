'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'
import { loginUser } from '@/services/auth'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const { checkAuth } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if(!formData.identifier || !formData.password) {
        setError('Please fill in all fields')
        setIsLoading(false)
        return
      }

      const res = await loginUser(formData)
      console.log('Login successful: ', res)
      await checkAuth()
      router.push('/home') 
    } catch (err: any) {
      console.log('Login error: ', err)
      setError(err.response?.data?.message || 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[500px] bg-[#111111]/40 backdrop-blur-xl border border-blue-900/25 shadow-2xl rounded-2xl p-2">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold text-white text-center">
          Welcome Back
        </CardTitle>

        <p className="text-sm text-neutral-400 text-center">
          Pick up where you left off.
        </p>
      </CardHeader>

      <CardContent>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <div className="space-y-2">
            <Label className="text-neutral-300">Username / Email</Label>
            <Input
              value={formData.identifier}
              onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
              disabled={isLoading}
              className="bg-[#1c1c1c] border-neutral-800 focus:border-blue-600 focus:ring-blue-600"
              placeholder="Enter your username or email"
            />
          </div>

          {/* <div className="space-y-2">
            <Label className="text-neutral-300">Email</Label>
            <Input
              className="bg-[#1c1c1c] border-neutral-800 focus:border-red-600 focus:ring-red-600"
              type="email"
              placeholder="Enter your email"
            />
          </div> */}

          <div className="space-y-2">
            <Label className="text-neutral-300">Password</Label>
            <Input
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value})}
              disabled={isLoading}
              className="bg-[#1c1c1c] border-neutral-800 focus:border-blue-600 focus:ring-blue-600"
              type="password"
              placeholder="Enter password"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <p className="text-sm text-neutral-400 text-center">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-400 transition"
            >
              Sign up
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
