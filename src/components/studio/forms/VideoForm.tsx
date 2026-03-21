'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { studioVideosTypes } from '@/types/studio'
import { Textarea } from '@/components/ui/textarea'

interface VideoFormProps {
  data?: studioVideosTypes
}

export default function VideoForm({ data }: VideoFormProps) {
  const isEdit = !!data

  const [title, setTitle] = useState(data?.title || '')
  const [description, setDescription] = useState(data?.description || '')
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)

  console.log('data inside video form : ', data)

  useEffect(() => {
    if (!data) return

    setTitle(data.title || '')
    setDescription(data.description || '')
  }, [data])

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // drag drop handler
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) setVideoFile(file)
  }

  const handleSelectClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setVideoFile(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)

    if (thumbnail) formData.append('thumbnail', thumbnail)
    if (!isEdit && videoFile) formData.append('videoFile', videoFile)

    console.log('FORM DATA:', {
      title,
      description,
      thumbnail,
      videoFile,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* VIDEO DROP */}
      {!isEdit && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-neutral-600 p-6 text-center rounded-lg"
        >
          {videoFile ? (
            <p className="mb-2">{videoFile.name}</p>
          ) : (
            <p className="mb-2">Drag & drop video here</p>
          )}

          {/* hidden input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* select button */}
          <Button
            type="button"
            onClick={handleSelectClick}
            className="bg-purple-600 px-4 rounded-lg text-sm font-semibold"
          >
            Select Video
          </Button>
        </div>
      )}

      {/* THUMBNAIL */}
      {!isEdit && (
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
        />
      )}

      {data?.thumbnail?.url && !thumbnail && (
        <div>
          <h1>Thumbnail</h1>
          <div className="w-full flex justify-center">
            <img
              src={data.thumbnail.url}
              alt="thumbnail"
              className="w-full max-w-lg h-72 object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      )}
      {/* TITLE */}
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* DESCRIPTION */}
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-h-[120px] resize-none"
      />

      <Button type="submit" className="w-full">
        {isEdit ? 'Update Video' : 'Upload Video'}
      </Button>
    </form>
  )
}
