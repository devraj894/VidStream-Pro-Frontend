'use client'

import { Button } from '@/components/ui/button'

export default function CoverUpload() {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // call updateUserCoverImage
    console.log(file)
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Cover Image</p>
      <input type="file" onChange={handleUpload} />
      <Button variant="outline">Upload Cover</Button>
    </div>
  )
}
