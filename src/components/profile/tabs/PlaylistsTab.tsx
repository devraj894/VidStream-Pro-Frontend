import PlaylistCard from '@/components/playlist/PlaylistCard'
import { playlistType } from '@/types/playlist'

interface PlaylistTabProps {
  playlists: playlistType[]
}

export default function PlaylistTab({ playlists }: PlaylistTabProps) {
  return (
    <div
      className="grid gap-6 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4"
    >
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>
  )
}
