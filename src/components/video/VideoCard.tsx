import { homeVideoType } from '@/types/videos'
import { formatDuration, formatTimeAgo, formatViews } from '@/lib/constant'
import { Dot } from 'lucide-react'

interface VideoCardProps {
  video: homeVideoType
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="min-w-[260px] cursor-pointer">
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <img
          src={video.thumbnail.url}
          className="w-full h-full object-cover hover:scale-105 transition duration-200"
        />

        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
          {formatDuration(video.duration)}
        </span>
      </div>

      <div className="mt-2 space-y-1">
        <h3 className="text-sm font-semibold text-white line-clamp-2">
          {video.title}
        </h3>

        <p className="flex items-center text-xs text-neutral-400">
          {video.owner} <Dot /> {formatViews(video.views)} views
          <Dot /> {formatTimeAgo(video.createdAt)}
        </p>
      </div>
    </div>
  )
}
