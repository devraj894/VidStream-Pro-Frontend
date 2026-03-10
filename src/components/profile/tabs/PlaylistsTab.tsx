import PlaylistCard from '@/components/playlist/PlaylistCard'
import { playlistType } from '@/types/playlist'

interface PlaylistTabProps {
  playlists: playlistType[]
}

export default function PlaylistTab({ playlists }: PlaylistTabProps) {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 py-2">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>
  )
}
