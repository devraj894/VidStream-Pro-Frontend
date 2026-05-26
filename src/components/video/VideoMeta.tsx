import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatTimeAgo } from '@/lib/utils'
import { VideoDetails } from '@/types/videos.types'
import { ThumbsUp, Share2, Download } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toggleSubscriptions } from '@/services/subscriptions' 
import { toggleVideoLike } from '@/services/likes'

interface VideoMetaProps {
  videoDetails: VideoDetails
}

export default function VideoMeta({ videoDetails }: VideoMetaProps) {
  const [isSubscribed, setIsSubscribed] = useState(videoDetails.owner.isSubscribed)
  const [loadingToggleSubscription, setLoadingToggleSubscription] = useState(false)

  const [totalLikes, setTotalLikes] = useState(videoDetails.likesCount)
  const [isLiked, setIsLiked] = useState(videoDetails.isLiked)
  const [loadingToggleLike, setLoadingToggleLike] = useState(false)

  const handleToggleSubscription = async () => {
    try {
      setLoadingToggleSubscription(true)
      setIsSubscribed((prev) => !prev)
      await toggleSubscriptions(videoDetails.owner._id)

    } catch (error) {
      setIsSubscribed((prev) => !prev)
      console.error("Failed to toggle subscription: ", error)

    } finally {
        setLoadingToggleSubscription(false)
    }
  }

  const handleToggleLike = async () => {
    try {
      setLoadingToggleLike(true)

      // optimistic update
      if (isLiked) {
        setTotalLikes((prev) => prev - 1)
      } else {
        setTotalLikes((prev) => prev + 1)
      }

      setIsLiked((prev) => !prev)

      await toggleVideoLike(videoDetails._id)

    } catch (error) {
      // rollback
      if (isLiked) {
        setTotalLikes((prev) => prev + 1)
      } else {
        setTotalLikes((prev) => prev - 1)
      }

      setIsLiked((prev) => !prev)

      console.error("Failed to toggle like: ", error)

    } finally {
      setLoadingToggleLike(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="text-xl font-semibold leading-snug text-white">
        {videoDetails.title}
      </h1>

      {/* Channel + Actions */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        {/* Channel Info */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href={`/profile/${videoDetails.owner.username}`}>
            <Avatar className="h-10 w-10">
              <AvatarImage src={videoDetails.owner.avatar.url} />
              <AvatarFallback>YT</AvatarFallback>
            </Avatar>
          </Link>

          <div>
            <p className="font-medium text-white">
              {videoDetails.owner.username}
            </p>
            <p className="text-sm text-muted-foreground text-white">
              {videoDetails.owner.subscribersCount} subscribers
            </p>
          </div>

          {videoDetails.isOwner ? (
            <Button variant="secondary" className="ml-4 rounded-full" asChild>
              <Link href="/studio">
                Manage Channel
              </Link>
            </Button>
          ) : (
            <Button
              onClick={handleToggleSubscription}
              disabled={loadingToggleSubscription}
              variant="secondary"
              className="ml-4 rounded-full"
            >
              {loadingToggleSubscription
                ? "Loading..."
                : isSubscribed
                  ? "Subscribed"
                  : "Subscribe"}
            </Button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 shrink-0">
         <Button
            variant={isLiked ? "default" : "secondary"}
            size="sm"
            className="gap-2"
            onClick={handleToggleLike}
            disabled={loadingToggleLike}
          >
            <ThumbsUp
              className={`h-4 w-4 transition-all ${
                isLiked ? "fill-current" : ""
              }`}
            />
            {totalLikes}
          </Button>
          <Button variant="secondary" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="secondary" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <Separator />

      {/* Description */}
      <div className="bg-white rounded-xl p-4 text-sm leading-relaxed">
        <p className="font-medium mb-2">
          {videoDetails.views} views • {formatTimeAgo(videoDetails.createdAt)}
        </p>
        <p className="text-black">{videoDetails.description}</p>
      </div>
    </div>
  )
}
