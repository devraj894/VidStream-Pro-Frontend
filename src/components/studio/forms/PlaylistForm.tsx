import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Playlist } from '@/types/playlist.types'
import { useEffect, useState } from 'react'

interface PlaylistFormProps {
  data?: Playlist
}

export default function PlaylistForm({ data }: PlaylistFormProps) {
  const isEdit = !!data

  const [title, setTitle] = useState(data?.name || '')
  const [description, setDescription] = useState(data?.description || '')

  useEffect(() => {
    if (!data) return

    setTitle(data.name)
    setDescription(data.description)
  }, [data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      name: title,
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
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-h-[120px] resize-none"
      />

      <Button type="submit" className="w-full">
        {isEdit ? 'Update Playlist' : 'Create Playlist'}
      </Button>
    </form>
  )
}
