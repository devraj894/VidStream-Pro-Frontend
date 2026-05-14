"use client"

import CommentSection from '@/components/comments/CommentSection'
import { Skeleton } from '@/components/ui/skeleton'
import VideoCard from '@/components/video/VideoCard'
import VideoMeta from '@/components/video/VideoMeta'
import VideoPlayer from '@/components/video/VideoPlayer'
import { fetchVideoComments } from '@/services/comments'
import { fetchSuggestedVideos, fetchVideoDetails } from '@/services/videos'
import { PaginatedResponse } from '@/types/api.types'
import { Comment } from '@/types/comments.types'
import { Video, VideoDetails } from '@/types/videos.types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function videoDetailsPage() {
  const params = useParams();
  const videoId = params.videoId as string;

  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null)
  const [videoDetailsLoading, setVideoDetailsLoading] = useState(true)

  const [comments, setComments] = useState<PaginatedResponse<Comment> | null>(null)
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [loadingMoreComments, setLoadingMoreComments] = useState(false)

  const [suggestedVideos, setSuggestedVideos] = useState<Video[]>([])
  const [suggestedVideosLoading, setSuggestedVideosLoading] = useState(true)

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

    const loadSuggestedVideos = async () => {
      try {
        const response = await fetchSuggestedVideos(videoId)
        setSuggestedVideos(response.data)
      } catch(error) {
        console.error('Error fetching suggested videos:', error)
      } finally {
        setSuggestedVideosLoading(false)
      }
      
    }
    
    loadVideoDetails()
    loadComments()
    loadSuggestedVideos()
  }, [videoId])
  
  const loadComments = async () => {
    try {
      const response = await fetchVideoComments(videoId, 1, 10);
      setComments(response.data);
    } catch(error) {
      console.error('Error fetching comments:', error)
    } finally {
      setCommentsLoading(false)
    }
  }

  console.log("Suggested Videos: ", suggestedVideos)

  console.log("Comments: ", comments)

   // LOAD MORE COMMENTS
  const loadMoreComments = async () => {

    if (!comments?.hasNextPage) return

    try {
      setLoadingMoreComments(true)

      const nextPage = comments.nextPage

      if(!nextPage) return

      const response = await fetchVideoComments(
        videoId,
        nextPage,
        10
      )

      setComments((prev) => {
        if (!prev) return response.data

        return {
          ...response.data,

          docs: [
            ...prev.docs,
            ...response.data.docs,
          ],
        }
      })

    } catch (error) {
      console.error(
        'Error loading more comments:',
        error
      )
    } finally {
      setLoadingMoreComments(false)
    }
  }

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
          <CommentSection
           comments={comments?.docs || []}
           totalComments={comments?.totalDocs}
           hasNextPage={comments?.hasNextPage}
           onLoadMore={loadMoreComments}
           commentsLoading={commentsLoading}
           loadingMoreComments={loadingMoreComments}
           videoId={videoId}
           onCommentAdded={loadComments}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          {suggestedVideosLoading ? (
            <>
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <Skeleton className="w-40 h-24 rounded-xl shrink-0" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            suggestedVideos.map((suggest) => (
              <VideoCard key={suggest._id} video={suggest} variant="compact" />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
