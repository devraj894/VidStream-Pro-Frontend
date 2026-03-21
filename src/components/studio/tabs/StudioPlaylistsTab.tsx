import { studioPlaylistTypes } from '@/types/studio'
import StudioPlaylistHeader from '../playlist/StudioPlaylistHeader'
import StudioPlaylistRow from '../playlist/StudioPlaylistRow'
import { ModalType } from '@/types/modal'

interface StudioPlaylistsTabProps {
  setModal: React.Dispatch<React.SetStateAction<ModalType | null>>
  playlists: studioPlaylistTypes[]
}

export default function StudioPlaylistsTab({
  setModal,
  playlists,
}: StudioPlaylistsTabProps) {
  return (
    <div className="mt-6 space-y-4">
      <StudioPlaylistHeader />

      {playlists.map((playlist) => (
        <StudioPlaylistRow
          key={playlist.id}
          setModal={setModal}
          playlist={playlist}
        />
      ))}
    </div>
  )
}
