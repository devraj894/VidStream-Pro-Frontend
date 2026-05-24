import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createPlaylist } from '@/services/playlists'
import { Playlist } from '@/types/playlist.types'
import { useEffect, useState } from 'react'

interface PlaylistFormProps {
  data?: Playlist
  onSuccess?: () => void
}

export default function PlaylistForm({ data, onSuccess }: PlaylistFormProps) {
  const isEdit = !!data

  const [title, setTitle] = useState(data?.name || '')
  const [description, setDescription] = useState(data?.description || '')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!data) return

    setTitle(data.name)
    setDescription(data.description)
  }, [data])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')

      await createPlaylist({ name: title, description: description })

      onSuccess?.()

    } catch(err: any) {
      setError('Failed to create playlist')
      setError(
        err?.response?.data?.message ||
        (isEdit ? 'Update failed' : 'Creation failed')
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-sm text-red-500 font-medium">
          {error}
        </p>
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

      <Button type="submit" className="w-full" disabled={loading}>
        {loading
          ? isEdit
            ? 'Updating...'
            : 'Uploading...'
          : isEdit
            ? 'Update Playlist'
            : 'Create Playlist'}
      </Button>
    </form>
  )
}
