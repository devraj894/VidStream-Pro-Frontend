'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { User } from '@/types/auth.types'
import { updateAccount } from '@/services/users'

export default function AccountForm({ user, checkAuth }: { user: User; checkAuth: () => Promise<void> }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
  })

  const [isSaving, setIsSaving] = useState(false)

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
      setIsSaving(true)
      
      await updateAccount({ fullName: form.fullName, email: form.email })

      await checkAuth();

    } catch (err) {
      console.error("Failed to update account: ", err)

    } finally {
      setIsSaving(false)
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

      <Button onClick={handleSubmit} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  )
}
