'use client'

import ConfirmModal from '@/components/modals/ConfirmModal'
import FormModal from '@/components/modals/FormModal'
import PlaylistForm from '@/components/studio/forms/PlaylistForm'
import TweetForm from '@/components/studio/forms/TweetForm'
import VideoForm from '@/components/studio/forms/VideoForm'
import StudioLayout from '@/components/studio/StudioLayout'
import StudioTabs from '@/components/studio/StudioTabs'
import { useAuth } from '@/context/AuthContext'
import { studioPlaylists } from '@/data/studio'
import { tweets } from '@/data/tweets'
import { ModalType } from '@/types/modal'
import { useState } from 'react'

export default function StudioPage() {
  const [refreshVideos, setRefreshVideos] = useState(0)
  const [modal, setModal] = useState<ModalType | null>(null)

  const { user } = useAuth();

  const modalType = modal?.type

  const isVideoModal =
    modalType === 'upload-video' || modalType === 'edit-video'

  const isPlaylistModal =
    modalType === 'upload-playlist' || modalType === 'edit-playlist'

  const isTweetModal =
    modalType === 'upload-tweet' || modalType === 'edit-tweet'

  const isDeleteVideoModal = modalType === 'delete-video'

  const isDeletePlaylistModal = modalType === 'delete-playlist'

  const isDeleteTweetModal = modalType === 'delete-tweet'

  const isDeleteModal =
    isDeleteVideoModal || isDeletePlaylistModal || isDeleteTweetModal

  const modalTitleMap: Record<ModalType['type'], string> = {
    'upload-video': 'Upload Video',
    'edit-video': 'Edit Video',
    'delete-video': 'Delete Video',
    'upload-playlist': 'Create Playlist',
    'edit-playlist': 'Edit Playlist',
    'delete-playlist': 'Delete Playlist',
    'add-video-to-playlist': 'Add Video',
    'remove-video-from-playlist': 'Remove Video',
    'upload-tweet': 'Create Tweet',
    'edit-tweet': 'Edit Tweet',
    'delete-tweet': 'Delete Tweet',
  }

  const title = modal ? modalTitleMap[modal.type] : ''

  const deleteTitle =
    modalType === 'delete-video'
      ? 'Delete Video?'
      : modalType === 'delete-playlist'
        ? 'Delete Playlist?'
        : modalType === 'delete-tweet'
          ? 'Delete Tweet'
          : ''

  const deleteDescription = 'This action cannot be undone'

  const handleDelete = () => {
    if (!modal) return

    switch (modal.type) {
      case 'delete-video':
        console.log('delete video id:', modal.data._id)
        break

      case 'delete-playlist':
        console.log('delete playlist id:', modal.data.id)
        break

      case 'delete-tweet':
        console.log('delete tweet id: ', modal.data.id)
        break
    }

    setModal(null)
  }

  return (
    <StudioLayout>
      <StudioTabs
        user={user}
        playlists={studioPlaylists}
        tweets={tweets}
        setModal={setModal}
        refreshVideos={refreshVideos}
      />
      <FormModal
        open={isVideoModal || isPlaylistModal || isTweetModal}
        onClose={() => setModal(null)}
        title={title}
      >
        {isVideoModal && (
          <VideoForm
            data={modalType === 'edit-video' ? modal?.data : undefined}
            onSuccess={() => {
              setModal(null)
              setRefreshVideos((prev) => prev + 1)
            }}
          />
        )}

        {isPlaylistModal && (
          <PlaylistForm
            data={modalType === 'edit-playlist' ? modal?.data : undefined}
          />
        )}

        {isTweetModal && (
          <TweetForm
            data={modalType === 'edit-tweet' ? modal?.data : undefined}
          />
        )}
      </FormModal>

      <ConfirmModal
        open={isDeleteModal}
        onClose={() => setModal(null)}
        title={deleteTitle}
        description={deleteDescription}
        onConfirm={handleDelete}
      />
    </StudioLayout>
  )
}
