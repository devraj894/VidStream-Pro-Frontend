'use client'

import { Spinner } from '@/components/ui/spinner'
import VideoCard from '@/components/video/VideoCard'
import { fetchUserHistory } from '@/services/videos'
import { Video } from '@/types/videos.types'
import { useEffect, useState } from 'react'

export default function historyPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetchUserHistory();
        setVideos(response.data);     
      } catch(err) {
        console.error("Failed to fetch user history:", err);
      } finally {
        setLoading(false);
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
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner/>
          </div>
        ) : videos.length === 0 ? (
           <div className="text-center py-20 text-neutral-400">
            <h2 className="text-2xl text-white font-semibold">
              No History Found
            </h2>
            <p className="text-sm mt-2">
              Start watching videos to build your history.
            </p>
          </div>
        ) : (
          <div>
            <div className="space-y-4">
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
        )}
      </div>
    </div>
  )
}
