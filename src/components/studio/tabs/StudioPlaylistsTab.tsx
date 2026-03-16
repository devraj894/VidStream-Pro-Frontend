import { studioPlaylistTypes } from '@/types/studio'
import StudioPlaylistHeader from '../playlist/StudioPlaylistHeader'
import StudioPlaylistRow from '../playlist/StudioPlaylistRow'

interface StudioPlaylistsTabProps {
  playlists: studioPlaylistTypes[]
}

export default function StudioPlaylistsTab({
  playlists,
}: StudioPlaylistsTabProps) {
  return (
    <div className="mt-6 space-y-4">
      <StudioPlaylistHeader />

      {playlists.map((playlist) => (
        <StudioPlaylistRow key={playlist.id} playlist={playlist} />
      ))}
    </div>
  )
}
