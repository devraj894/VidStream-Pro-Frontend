'use client'

import VideoCard from '@/components/video/VideoCard'
import { fetchUserHistory } from '@/services/videos'
import { Video } from '@/types/videos.types'
import { useEffect, useState } from 'react'

export default function historyPage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetchUserHistory();
        setVideos(response.data);     
      } catch(err) {
        console.error("Failed to fetch user history:", err);
      }
    }

    fetchHistory();
  }, [])

  console.log("User history videos:", videos);

  const handleRemove = (_id: string) => {
    setVideos((prev) => prev.filter((v) => v._id !== _id))
  }

  return (
    <div className="pt-20 px-8">
      <h1 className="text-4xl text-white font-bold">My History</h1>
      <div className="space-y-4 pt-7">
        {videos.map((video) => (
          <VideoCard
            key={video._id}
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
