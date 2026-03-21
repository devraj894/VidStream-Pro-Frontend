'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { homeVideoType } from '@/types/videos'

interface AddVideoToPlaylistModalProps {
  playlistId: string
  videos: homeVideoType[]
}

export default function AddVideoToPlaylistModal({
  playlistId,
  videos,
}: AddVideoToPlaylistModalProps) {
  const [selected, setSelected] = useState<string[]>([])

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    )
  }

  const handleAdd = () => {
    console.log('playlistId:', playlistId)
    console.log('selected videos:', selected)

    // future:
    // call API loop
  }

  return (
    <div className="space-y-4">
      {/* VIDEO LIST */}
      <div className="max-h-80 overflow-y-auto space-y-2">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800 cursor-pointer"
            onClick={() => toggleSelect(video.id)}
          >
            <img
              src={video.thumbnail.url}
              className="w-20 h-12 object-cover rounded"
            />

            <p className="flex-1">{video.title}</p>

            <input
              type="checkbox"
              checked={selected.includes(video.id)}
              readOnly
            />
          </div>
        ))}
      </div>

      {/* ACTION */}
      <Button
        onClick={handleAdd}
        disabled={selected.length === 0}
        className="w-full"
      >
        Add Selected ({selected.length})
      </Button>
    </div>
  )
}
