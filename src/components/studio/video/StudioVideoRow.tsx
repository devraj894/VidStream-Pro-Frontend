import { formatTimeAgo, formatViews } from '@/lib/utils'
import { Eye, Pencil, ThumbsUp, Trash } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { studioVideosTypes } from '@/types/studio'
import { ModalType } from '@/types/modal'
import { Video } from '@/types/videos.types'

interface StudioVideoRowProps {
  setModal: React.Dispatch<React.SetStateAction<ModalType | null>>
  video: Video
}

export default function StudioVideoRow({
  setModal,
  video,
}: StudioVideoRowProps) {
  return (
    <div className="border-b border-neutral-800 py-3 px-2 md:px-0 flex gap-3 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] md:items-center md:gap-4 hover:bg-neutral-900/50 transition">
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
          <div className="md:hidden space-y-2">
            <Badge
              variant={video.isPublished ? 'default' : 'secondary'}
              className="text-[10px] px-1.5 py-0"
            >
              {video.isPublished ? 'Published' : 'Draft'}
            </Badge>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-2 text-xs">
                <Eye className="h-4 w-4" />
                <span className="text-xs font-semibold">
                  {formatViews(video.views)}
                </span>
              </div>
              {/* <div className="flex items-center gap-2 text-xs">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-xs font-semibold">{video.likes}</span>
              </div> */}
            </div>
            {/* <span className="text-[11px] text-neutral-400">
              {formatTimeAgo(video.createdAt)}
            </span> */}
          </div>
        </div>
      </div>

      {/* STATUS (Desktop Only) */}
      <div className="hidden md:block">
        <Badge variant={video.isPublished ? 'default' : 'secondary'}>
          {video.isPublished ? 'Published' : 'Draft'}
        </Badge>
      </div>

      {/* VIEWS (Desktop Only) */}
      <span className="hidden md:block text-sm text-neutral-300">
        {formatViews(video.views)}
      </span>

      {/* LIKES (Desktop Only) */}
      {/* <span className="hidden md:block text-sm text-neutral-300">
        {video.likes}
      </span> */}

      {/* DATE (Desktop Only) */}
      <span className="hidden md:block text-sm text-neutral-400">
        {formatTimeAgo(video.createdAt)}
      </span>

      {/* ACTIONS (Always visible, adjusted for mobile) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-1 md:gap-2">
        {/* Buttons */}
        <div className="flex gap-4 self-end">
          <button className="rounded-md hover:bg-neutral-800 transition text-neutral-400 hover:text-white">
            <Pencil
              size={18}
              onClick={() => setModal({ type: 'edit-video', data: video })}
              className="text-blue-500"
            />
          </button>
          <button className="rounded-md hover:bg-red-500/10 transition text-neutral-500 hover:text-red-500">
            <Trash
              size={18}
              onClick={() => setModal({ type: 'delete-video', data: video })}
              className="text-red-500"
            />
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1 md:hidden" />

        {/* Date */}
        <span className="md:hidden text-[9px] text-neutral-400 self-end">
          {formatTimeAgo(video.createdAt)}
        </span>
      </div>
    </div>
  )
}
