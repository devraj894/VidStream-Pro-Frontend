import { Dot, Play, Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { playlistDetailsTypes } from '@/types/playlist'
import { ModalType } from '@/types/modal'

interface StudioPlaylistVideoHeaderProps {
  setModal: React.Dispatch<React.SetStateAction<ModalType | null>>
  playlistDetails: playlistDetailsTypes
}

export default function StudioPlaylistVideoHeader({
  setModal,
  playlistDetails,
}: StudioPlaylistVideoHeaderProps) {
  return (
    <div className="relative">
      {/* Cover */}
      <div className="h-[280px] w-full overflow-hidden">
        <img
          src={playlistDetails.videos[0].thumbnail.url}
          className="w-full h-full object-cover"
        />
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

        <Button
          onClick={() =>
            setModal({
              type: 'add-video-to-playlist',
              data: { playlistId: playlistDetails.id },
            })
          }
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Play className="mr-2" size={16} /> Add Video
        </Button>
      </div>
    </div>
  )
}
