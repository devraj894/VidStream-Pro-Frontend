'use client'

import VideoCard from '@/components/video/VideoCard'
import { historyVideos } from '@/data/videos'
import { useState } from 'react'

export default function historyPage() {
  const [videos, setVideos] = useState(historyVideos)

  const handleRemove = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id))
  }

  return (
    <div className="pt-20 px-8">
      <h1 className="text-4xl text-white font-bold">My History</h1>
      <div className="space-y-4 pt-7">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            variant="compact"
            removable
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  )
}
