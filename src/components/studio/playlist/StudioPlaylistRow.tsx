import { formatTimeAgo, formatViews } from '@/lib/constant'
import { Eye, Pencil, Trash } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { studioPlaylistTypes, studioVideosTypes } from '@/types/studio'
import Link from 'next/link'

interface StudioPlaylistRowProps {
  playlist: studioPlaylistTypes
}

export default function StudioPlaylistRow({
  playlist,
}: StudioPlaylistRowProps) {
  return (
    <div className="border-b border-neutral-800 py-3 px-2 md:px-0 flex gap-3 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] md:items-center md:gap-4 hover:bg-neutral-900/50 transition">
      {/* VIDEO & INFO (Main Section) */}
      <div className="flex gap-3 flex-1 min-w-0">
        <img
          src={playlist.thumbnail.url}
          className="w-24 md:w-28 aspect-video rounded-md object-cover flex-shrink-0"
        />

        <div className="flex flex-col justify-center min-w-0">
          <p className="font-medium text-sm md:text-base text-white line-clamp-2 leading-tight">
            {playlist.title}
          </p>

          {/* Mobile-only stats and Status Badge */}
          <div className="flex flex-wrap items-center gap-2 mt-1.5 md:hidden">
            <Badge className="text-[10px] px-1.5 py-0">{playlist.videos}</Badge>
            <span className="text-[11px] text-neutral-400">
              {formatViews(playlist.views)} •{' '}
              {formatTimeAgo(playlist.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* STATUS (Desktop Only) */}
      <div className="hidden md:block">
        <Badge>{playlist.videos}</Badge>
      </div>

      {/* VIEWS (Desktop Only) */}
      <span className="hidden md:block text-sm text-neutral-300">
        {formatViews(playlist.views)}
      </span>

      {/* LIKES (Desktop Only) */}
      <span className="hidden md:block text-sm text-neutral-300">
        {playlist.likes}
      </span>

      {/* DATE (Desktop Only) */}
      <span className="hidden md:block text-sm text-neutral-400">
        {formatTimeAgo(playlist.createdAt)}
      </span>

      {/* ACTIONS (Always visible, adjusted for mobile) */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
        <button className="p-2 rounded-md hover:bg-neutral-800 transition text-neutral-400 hover:text-white">
          <Pencil size={16} className="text-blue-500" />
        </button>
        <button className="p-2 rounded-md hover:bg-red-500/10 transition text-neutral-500 hover:text-red-500">
          <Trash size={16} className="text-red-500" />
        </button>
        <Link href={'/studio/playlists/1'}>
          <button className="p-2 rounded-md hover:bg-red-500/10 transition text-neutral-500 hover:text-green-500">
            <Eye size={16} className="text-green-500" />
          </button>
        </Link>
      </div>
    </div>
  )
}
