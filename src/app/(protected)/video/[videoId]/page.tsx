"use client"

import CommentSection from '@/components/comments/CommentSection'
import { Skeleton } from '@/components/ui/skeleton'
import VideoCard from '@/components/video/VideoCard'
import VideoMeta from '@/components/video/VideoMeta'
import VideoPlayer from '@/components/video/VideoPlayer'
import { comments } from '@/data/comments'
import { suggestedVideos } from '@/data/videos'
import { fetchVideoDetails } from '@/services/videos'
import { VideoDetails } from '@/types/videos.types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function videoDetailsPage() {
  const params = useParams();
  const videoId = params.videoId as string;

  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null)
  const [videoDetailsLoading, setVideoDetailsLoading] = useState(true)

  useEffect(() => {
    const loadVideoDetails = async () => {
      try {
        const response = await fetchVideoDetails(videoId);
        setVideoDetails(response.data)
      } catch (error) {
        console.error('Error fetching video details:', error)
      } finally {
        setVideoDetailsLoading(false)
      }
    }

    loadVideoDetails()
  }, [videoId])

  return (
    <div className="px-8 pt-14">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {videoDetailsLoading ? (
            <>
              {/* Video Player Skeleton */}
              <Skeleton className="w-full aspect-video rounded-xl" />

              {/* Video Meta Skeleton */}
              <div className="space-y-4">
                {/* title */}
                <Skeleton className="h-7 w-3/4" />

                {/* channel info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" />

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>

                  <Skeleton className="h-10 w-28 rounded-full" />
                </div>

                {/* action buttons */}
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-24 rounded-full" />
                  <Skeleton className="h-10 w-24 rounded-full" />
                  <Skeleton className="h-10 w-24 rounded-full" />
                </div>
              </div>
            </>
          ) : (
          videoDetails && (
            <>
              <VideoPlayer videoFile={videoDetails?.videoFile} />
              <VideoMeta videoDetails={videoDetails} />
            </>
          )
          )}
          <CommentSection comments={comments} />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          {suggestedVideos.map((suggest) => (
            <VideoCard key={suggest.id} video={suggest} variant="compact" />
          ))}
        </div>
      </div>
    </div>
  )
}
