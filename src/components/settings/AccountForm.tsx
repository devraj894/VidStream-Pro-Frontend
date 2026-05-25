'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { User } from '@/types/auth.types'

export default function AccountForm({ user }: { user: User }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
  })

  useEffect(() => {
    setForm({
      fullName: user.fullName,
      email: user.email,
    })
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      // call updateAccountDetails API
      console.log(form)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-4">
      <Input
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder="Full Name"
      />
      <Input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <Button onClick={handleSubmit}>Save Changes</Button>
    </div>
  )
}
