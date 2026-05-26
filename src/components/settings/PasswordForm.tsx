'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { changePassword } from '@/services/users'

export default function PasswordForm() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    const { currentPassword, newPassword, confirmPassword } = form

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('All fields are required')
      return
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    if (currentPassword === newPassword) {
      alert('New password must be different from current password')
      return
    }

    try {
      setIsLoading(true)

      await changePassword({
        oldPassword: currentPassword,
        newPassword: newPassword,
      })

      alert('Password updated successfully')

      setForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      console.error('Failed to update password', error)
      alert('Failed to update password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Input
        name="currentPassword"
        type="password"
        placeholder="Current Password"
        value={form.currentPassword}
        onChange={handleChange}
      />
      <Input
        name="newPassword"
        type="password"
        placeholder="New Password"
        value={form.newPassword}
        onChange={handleChange}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Password'}
      </Button>
    </div>
  )
}
