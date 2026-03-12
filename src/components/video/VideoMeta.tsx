import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatTimeAgo } from '@/lib/constant'
import { videoDetailsTypes } from '@/types/videos'
import { ThumbsUp, Share2, Download } from 'lucide-react'

interface VideoMetaProps {
  videoDetails: videoDetailsTypes
}

export default function VideoMeta({ videoDetails }: VideoMetaProps) {
  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="text-xl font-semibold leading-snug text-white">
        {videoDetails.title}
      </h1>

      {/* Channel + Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Channel Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={videoDetails.owner.avatar.url} />
            <AvatarFallback>YT</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium text-white">
              {videoDetails.owner.username}
            </p>
            <p className="text-sm text-muted-foreground text-white">
              {videoDetails.owner.subscribers} subscribers
            </p>
          </div>

          <Button variant="secondary" className="ml-4 rounded-full">
            Subscribe
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            {videoDetails.likes}
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
