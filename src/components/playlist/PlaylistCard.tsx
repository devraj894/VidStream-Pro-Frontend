import { formatTimeAgo } from '@/lib/constant'
import { playlistType } from '@/types/playlist'
import { Play } from 'lucide-react'
import Link from 'next/link'

interface PlaylistCardProps {
  playlist: playlistType
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  console.log('playlist data inside playlist card', playlist)
  return (
    <Link href={`/playlists/${playlist.id}`}>
      <div className="group cursor-pointer space-y-2">
        {/* Thumbnail */}
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <img
            src={playlist.previewThumbnail}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />

          {/* Dark overlay */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1333] to-transparent" />

          {/* Play icon */}
          <div className="absolute left-3 bottom-3 flex items-center gap-2 text-white">
            <Play size={18} fill="white" />
            <span className="text-sm font-medium">
              {playlist.totalVideos} videos
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex justify-between">
          <h3 className="text-white font-semibold line-clamp-1">
            {playlist.name}
          </h3>
          <p className="text-xs text-neutral-400">
            Updated {formatTimeAgo(playlist.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  )
}
