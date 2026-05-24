import { formatTimeAgo, formatViews } from '@/lib/utils'
import { Eye, Pencil, Play, ThumbsUp, Trash } from 'lucide-react'
import Link from 'next/link'
import { ModalType } from '@/types/modal'
import { Playlist } from '@/types/playlist.types'

interface StudioPlaylistRowProps {
  setModal: React.Dispatch<React.SetStateAction<ModalType | null>>
  playlist: Playlist
}

export default function StudioPlaylistRow({
  setModal,
  playlist,
}: StudioPlaylistRowProps) {
  return (
    <div className="border-b border-neutral-800 py-3 px-2 md:px-0 flex gap-3 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] md:items-center md:gap-4 hover:bg-neutral-900/50 transition">
      {/* VIDEO & INFO (Main Section) */}
      <div className="flex gap-3 flex-1 min-w-0">
        <img
          src={playlist.previewThumbnail}
          className="w-24 md:w-28 aspect-video rounded-md object-cover flex-shrink-0"
        />

        <div className="flex flex-col justify-center min-w-0">
          <p className="font-medium text-sm md:text-base text-white line-clamp-2 leading-tight">
            {playlist.name}
          </p>

          {/* Mobile-only stats and Status Badge */}
          <div className="md:hidden space-y-2">
              <span className="text-sm text-neutral-300">
                Videos: {playlist.totalVideos}
              </span>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-2 text-xs">
                <Eye className="h-4 w-4" />
                <span className="text-xs font-semibold">
                  {formatViews(playlist.totalViews)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-xs font-semibold">{playlist.totalLikes}</span>
              </div>
            </div>
            {/* <span className="text-[11px] text-neutral-400">
              {formatTimeAgo(video.createdAt)}
            </span> */}
          </div>
        </div>
      </div>

      {/* STATUS (Desktop Only) */}
      <div className="hidden md:block">
        <span className="text-sm text-neutral-300">
          {playlist.totalVideos}
        </span>
      </div>

      {/* VIEWS (Desktop Only) */}
      <span className="hidden md:block text-sm text-neutral-300">
        {formatViews(playlist.totalViews)}
      </span>

      {/* LIKES (Desktop Only) */}
      <span className="hidden md:block text-sm text-neutral-300">
        {playlist.totalLikes}
      </span>

      {/* DATE (Desktop Only) */}
      <span className="hidden md:block text-sm text-neutral-400">
        {formatTimeAgo(playlist.createdAt)}
      </span>

      {/* ACTIONS (Always visible, adjusted for mobile) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-1 md:gap-2">
        {/* Buttons */}
        <div className="flex items-center gap-4 self-end">
          <button
            onClick={() => setModal({ type: 'edit-playlist', data: playlist })}
            className="rounded-md hover:bg-neutral-800 transition text-neutral-400 hover:text-white"
          >
            <Pencil size={18} className="text-blue-500" />
          </button>
          <button
            onClick={() =>
              setModal({ type: 'delete-playlist', data: playlist })
            }
            className="rounded-md hover:bg-red-500/10 transition text-neutral-500 hover:text-red-500"
          >
            <Trash size={18} className="text-red-500" />
          </button>
          <Link
            href={'/studio/playlists/1'}
            className="rounded-md hover:bg-red-500/10 transition text-neutral-500 hover:text-green-500"
          >
            <Play size={18} className="text-green-500" />
          </Link>
        </div>

        {/* Spacer */}
        <div className="flex-1 md:hidden" />

        {/* Date */}
        <span className="md:hidden text-[9px] text-neutral-400 self-end">
          {formatTimeAgo(playlist.createdAt)}
        </span>
      </div>
    </div>
  )
}
