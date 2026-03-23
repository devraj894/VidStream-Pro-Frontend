'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function PasswordForm() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (form.newPassword !== form.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    // call changeCurrentUserPassword
    console.log(form)
  }

  return (
    <div className="space-y-4">
      <Input
        name="currentPassword"
        type="password"
        placeholder="Current Password"
        onChange={handleChange}
      />
      <Input
        name="newPassword"
        type="password"
        placeholder="New Password"
        onChange={handleChange}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
      />

      <Button onClick={handleSubmit}>Update Password</Button>
    </div>
  )
}
