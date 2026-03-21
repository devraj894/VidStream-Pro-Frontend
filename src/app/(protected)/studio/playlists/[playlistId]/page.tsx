'use client'

import ConfirmModal from '@/components/modals/ConfirmModal'
import FormModal from '@/components/modals/FormModal'
import AddVideoToPlaylistModal from '@/components/studio/modals/AddVideoToPlaylistModal'
import StudioPlaylistVideoHeader from '@/components/studio/playlist/videos/StudioPlaylistHeader'
import StudioPlaylistVideosRow from '@/components/studio/playlist/videos/StudioPlaylistVideosRow'
import StudioPlaylistVideosTableHeader from '@/components/studio/playlist/videos/StudioPlaylistVideosTableHeader'
import { playlistDetails } from '@/data/playlists'
import { videos } from '@/data/videos'
import { ModalType } from '@/types/modal'
import { useState } from 'react'

export default function PlaylistDetailPage() {
  const [modal, setModal] = useState<ModalType | null>(null)

  const modalType = modal?.type

  const isAddVideoModal = modalType === 'add-video-to-playlist'

  const isRemoveVideoModal = modalType === 'remove-video-from-playlist'

  return (
    <div>
      <StudioPlaylistVideoHeader
        setModal={setModal}
        playlistDetails={playlistDetails}
      />
      <div className="mt-6 px-8">
        <StudioPlaylistVideosTableHeader />
        {playlistDetails.videos.map((video) => (
          <StudioPlaylistVideosRow
            key={video.id}
            setModal={setModal}
            video={video}
            playlistId={playlistDetails.id}
          />
        ))}
      </div>

      <FormModal
        open={isAddVideoModal}
        onClose={() => setModal(null)}
        title="Add Videos to Playlist"
      >
        {isAddVideoModal && (
          <AddVideoToPlaylistModal
            playlistId={modal.data.playlistId}
            videos={videos}
          />
        )}
      </FormModal>

      <ConfirmModal
        open={isRemoveVideoModal}
        onClose={() => setModal(null)}
        title="Remove Video from Playlist"
        description="Are you sure you want to remove this video from the playlist?"
        onConfirm={() => {
          if (modal?.type === 'remove-video-from-playlist') {
            console.log('delete video id:', modal.data.videoId)
          }
          setModal(null)
        }}
      />
    </div>
  )
}
