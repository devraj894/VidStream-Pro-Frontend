'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // fake API call to simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log('Form submitted')
    } catch (err) {
      setError('Failed to submit form')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[500px] bg-[#111111]/90 backdrop-blur-md border border-red-900/40 shadow-2xl rounded-2xl p-2">
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
            <Label className="text-neutral-300">Username</Label>
            <Input
              className="bg-[#1c1c1c] border-neutral-800 focus:border-red-600 focus:ring-red-600"
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-neutral-300">Email</Label>
            <Input
              className="bg-[#1c1c1c] border-neutral-800 focus:border-red-600 focus:ring-red-600"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-neutral-300">Password</Label>
            <Input
              className="bg-[#1c1c1c] border-neutral-800 focus:border-red-600 focus:ring-red-600"
              type="password"
              placeholder="Enter password"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <p className="text-sm text-neutral-400 text-center">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-red-500 hover:text-red-400 transition"
            >
              Sign up
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
