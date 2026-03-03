'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { X } from 'lucide-react'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const avatarRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0])
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0])
    }
  }

  const removeAvatar = () => {
    setAvatarFile(null)
    if (avatarRef.current) {
      avatarRef.current.value = ''
    }
  }

  const removeCover = () => {
    setCoverFile(null)
    if (coverRef.current) {
      coverRef.current.value = ''
    }
  }

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
          Create Your Account
        </CardTitle>

        <p className="text-sm text-neutral-400 text-center">
          Start streaming your favorite content
        </p>
      </CardHeader>

      <CardContent>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-neutral-300">Full Name</Label>
              <Input
                className="bg-[#1c1c1c] border-neutral-800 focus:border-red-600 focus:ring-red-600"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-neutral-300">Username</Label>
              <Input
                className="bg-[#1c1c1c] border-neutral-800 focus:border-red-600 focus:ring-red-600"
                placeholder="Enter your username"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
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
          </div>

          {/* Row 3 */}
          <div className="space-y-2">
            <Label className="text-neutral-300">Confirm Password</Label>
            <Input
              className="bg-[#1c1c1c] border-neutral-800 focus:border-red-600 focus:ring-red-600"
              type="password"
              placeholder="Confirm password"
            />
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-neutral-300">Avatar</Label>
              <div className="relative">
                <Input
                  ref={avatarRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="bg-[#1c1c1c] border-neutral-800 file:text-white file:bg-neutral-700 file:hover:bg-neutral-600 file:hover:cursor-pointer file:border-0 file:px-2 file:py-1 file:rounded-md"
                />
                {avatarFile && (
                  <X
                    onClick={removeAvatar}
                    className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-neutral-300">Cover Image (Optional)</Label>
              <div className="relative">
                <Input
                  ref={coverRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="bg-[#1c1c1c] border-neutral-800 file:text-white file:bg-neutral-700 file:hover:bg-neutral-600 file:hover:cursor-pointer file:border-0 file:px-2 file:py-1 file:rounded-md"
                />
                {coverFile && (
                  <X
                    onClick={removeCover}
                    className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  />
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <p className="text-sm text-neutral-400 text-center">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-red-500 hover:text-red-400 transition"
            >
              Log in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
