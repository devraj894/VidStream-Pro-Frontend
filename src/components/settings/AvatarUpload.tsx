'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function AvatarUpload({avatar}: {avatar?: string}) {
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

    // preview generate
    const imageUrl = URL.createObjectURL(selectedFile)
    setPreview(imageUrl)
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      // API call (FormData use karna)
      console.log(file)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-4 flex flex-col items-center md:items-start">
      <p className="text-sm font-medium">Avatar</p>

      {preview || avatar ? (
        <div className="flex flex-col items-center gap-3">
          <img
            src={preview || avatar}
            className="w-32 h-32 rounded-full object-cover border"
          />

          {preview && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPreview(null)
                setFile(null)
              }}
            >
              Remove
            </Button>
          )}
        </div>
      ) : (
        <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-xs">
          No Image
        </div>
      )}

      <label className="cursor-pointer">
        <span className="text-sm underline">Choose Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      <Button size="sm" onClick={handleUpload} disabled={!file}>
        Upload Avatar
      </Button>
    </div>
  )
}
