import { formatTimeAgo, formatViews } from '@/lib/constant'
import { Trash } from 'lucide-react'
import { homeVideoType } from '@/types/videos'

interface StudioPlaylistVideosRowProps {
  video: homeVideoType
}

export default function StudioPlaylistVideosRow({
  video,
}: StudioPlaylistVideosRowProps) {
  return (
    <div className="border-b border-neutral-800 py-3 px-2 md:px-0 flex gap-3 md:grid md:grid-cols-[3fr_1fr_1fr_0.5fr] md:items-center md:gap-4 hover:bg-neutral-900/50 transition">
      {/* VIDEO & INFO (Main Section) */}
      <div className="flex gap-3 flex-1 min-w-0">
        <img
          src={video.thumbnail.url}
          className="w-24 md:w-28 aspect-video rounded-md object-cover flex-shrink-0"
        />

        <div className="flex flex-col justify-center min-w-0">
          <p className="font-medium text-sm md:text-base text-white line-clamp-2 leading-tight">
            {video.title}
          </p>

          {/* Mobile-only stats and Status Badge */}
          <div className="flex flex-wrap items-center gap-2 mt-1.5 md:hidden">
            <span className="text-[11px] text-neutral-400">
              {formatViews(video.views)} • {formatTimeAgo(video.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* VIEWS (Desktop Only) */}
      <span className="hidden md:block text-sm text-neutral-300">
        {formatViews(video.views)}
      </span>

      {/* DATE (Desktop Only) */}
      <span className="hidden md:block text-sm text-neutral-400">
        {formatTimeAgo(video.createdAt)}
      </span>

      {/* ACTIONS (Always visible, adjusted for mobile) */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
        <button className="p-2 rounded-md hover:bg-red-500/10 transition text-neutral-500 hover:text-red-500">
          <Trash size={16} className="text-red-500" />
        </button>
      </div>
    </div>
  )
}
