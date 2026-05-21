import { Dot, Play, Shuffle } from 'lucide-react'
import { Button } from '../ui/button'
import { PlaylistDetails } from '@/types/playlist.types'

interface PlaylistHeaderProps {
  playlistDetails: PlaylistDetails
}

export default function PlaylistHeader({
  playlistDetails,
}: PlaylistHeaderProps) {
  return (
    <div className="relative">
      {/* Cover */}
      <div className="h-[280px] w-full overflow-hidden relative">
        {playlistDetails.videos.length > 0 ? (
          <img
            src={playlistDetails.videos[0].thumbnail.url}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
            <p className="text-neutral-300 text-lg font-medium">
              Empty Playlist
            </p>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 p-8 space-y-4">
        <h1 className="text-4xl font-bold text-white">
          {playlistDetails.name}
        </h1>

        <p className="text-neutral-300 max-w-2xl">
          {playlistDetails.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-neutral-400">
          <span>{playlistDetails.owner.fullName}</span>
          <Dot />
          <span>{playlistDetails.videos.length}</span>
          <Dot />
        </div>

        <div className="flex gap-3 pt-2">
          <Button className="bg-red-600 hover:bg-red-700">
            <Play className="mr-2" size={16} /> Play All
          </Button>

          <Button variant="secondary">
            <Shuffle className="mr-2" size={16} /> Shuffle
          </Button>
        </div>
      </div>
    </div>
  )
}
