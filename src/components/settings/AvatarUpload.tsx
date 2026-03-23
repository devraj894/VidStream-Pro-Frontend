'use client'

import { Button } from '@/components/ui/button'

export default function AvatarUpload() {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // call updateUserAvatar
    console.log(file)
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Avatar</p>
      <input type="file" onChange={handleUpload} />
      <Button variant="outline">Upload Avatar</Button>
    </div>
  )
}
