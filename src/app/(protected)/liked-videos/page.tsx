'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import VideoCard from '@/components/video/VideoCard'
import { getLikedVideos } from '@/services/likes'
import { PaginatedResponse } from '@/types/api.types'
import { Video } from '@/types/videos.types'
import { useEffect, useState } from 'react'

export default function likedVideosPage() {
  const [videos, setVideos] = useState<PaginatedResponse<Video>>();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const response = await getLikedVideos();
        setVideos(response.data);     
      } catch(err) {
        console.error("Failed to fetch user liked videos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLikedVideos();
  }, [])

   const loadMoreVideos = async () => {
      if(loadingMore) return;
      if(!videos?.hasNextPage) return
  
      try {
        setLoadingMore(true)      
        const nextPage = videos.nextPage;
  
        if(!nextPage) return;
  
        const response = await getLikedVideos({
          page: nextPage,
          limit: 10,
        })
  
        setVideos((prev) => {
          if(!prev) return response.data;
  
          return {
            ...response.data,
  
            docs: [
              ...prev.docs,
              ...response.data.docs
            ],
          }
        })
      } catch(err) {
        console.log("Error loading more liked videos", err);
  
      } finally {
        setLoadingMore(false)
      }
    }

  const handleUnlike = (videoId: string) => {
    console.log("video id: ", videoId)
  }

  return (
    <div className="pt-20 px-8">
      <h1 className="text-4xl text-white font-bold">My Liked Videos</h1>
      <div className="space-y-4 pt-7">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner/>
          </div>
        ) : videos?.docs.length === 0 ? (
           <div className="text-center py-20 text-neutral-400">
            <h2 className="text-2xl text-white font-semibold">
              No Liked Videos Found
            </h2>
            <p className="text-sm mt-2">
              Start to like videos to build your liked videos.
            </p>
          </div>
        ) : (
          <div>
            {videos?.docs.map((video) => (
              <VideoCard
                actionType="like"
                key={video._id}
                video={video}
                variant="compact"
                removable
                onRemove={handleUnlike}
              />
            ))}

            {/* LOAD MORE */}
            {videos?.hasNextPage && (
              <div className="flex justify-center">
    
              <Button
                variant="secondary"
                onClick={loadMoreVideos}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  "Loading..."
                ) : (
                  "Load More"
                )}
            </Button>
    
             </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
