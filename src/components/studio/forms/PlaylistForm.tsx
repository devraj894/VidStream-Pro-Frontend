import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { studioPlaylistTypes } from '@/types/studio'
import { useEffect, useState } from 'react'

interface PlaylistFormProps {
  data?: studioPlaylistTypes
}

export default function PlaylistForm({ data }: PlaylistFormProps) {
  const isEdit = !!data

  const [title, setTitle] = useState(data?.title || '')
  const [description, setDescription] = useState(data?.description || '')

  useEffect(() => {
    if (!data) return

    setTitle(data.title)
    setDescription(data.description)
  }, [data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      title,
      description,
    }

    console.log('PAYLOAD: ', payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* TITLE */}
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* DESCRIPTION */}
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button type="submit" className="w-full">
        {isEdit ? 'Update Playlist' : 'Create Playlist'}
      </Button>
    </form>
  )
}
