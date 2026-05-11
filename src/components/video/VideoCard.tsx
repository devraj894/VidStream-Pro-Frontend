import { formatDuration, formatTimeAgo, formatViews } from '@/lib/utils'
import { Dot } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FeedVideo } from '@/types/feed.types'

interface VideoCardProps {
  video: FeedVideo
  variant?: 'default' | 'compact'
  removable?: boolean
  onRemove?: (id: string) => void
}

export default function VideoCard({
  video,
  variant = 'default',
  removable,
  onRemove,
}: VideoCardProps) {
  return (
    <Link href={`/video/${video._id}`} className="block">
      <div
        className={
          variant === 'compact'
            ? 'md:flex gap-3 cursor-pointer relative'
            : 'w-[260px] flex-shrink-0 cursor-pointer'
        }
      >
        <div
          className={
            variant === 'compact'
              ? 'relative md:w-40 aspect-video rounded-lg overflow-hidden'
              : 'relative aspect-video rounded-lg overflow-hidden'
          }
        >
          <img
            src={video.thumbnail.url}
            className="w-full h-full object-cover hover:scale-105 transition duration-200"
          />

          {/* Remove button mobile overlay */}
          {removable && onRemove && (
            <Button
              className="absolute top-2 right-2 md:hidden"
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                onRemove(video._id)
              }}
            >
              Remove
            </Button>
          )}

          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
            {formatDuration(video.duration)}
          </span>
        </div>

        <div className="mt-2 space-y-1">
          <h3 className="text-sm font-semibold text-white line-clamp-2">
            {video.title}
          </h3>

          <p className="flex items-center text-xs text-neutral-400">
            {video.Owner.fullName} <Dot /> {formatViews(video.views)} views
            <Dot /> {formatTimeAgo(video.createdAt)}
          </p>
        </div>

        {/* Remove button desktop */}
        {removable && onRemove && (
          <Button
            variant="secondary"
            size="lg"
            className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2"
            onClick={(e) => {
              e.preventDefault()
              onRemove(video._id)
            }}
          >
            Remove
          </Button>
        )}
      </div>
    </Link>
  )
}
