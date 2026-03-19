'use client'

import ConfirmModal from '@/components/modals/ConfirmModal'
import FormModal from '@/components/modals/FormModal'
import VideoForm from '@/components/studio/forms/VideoForm'
import StudioLayout from '@/components/studio/StudioLayout'
import StudioTabs from '@/components/studio/StudioTabs'
import { studioPlaylists, studioStats, studioVideos } from '@/data/studio'
import { tweets } from '@/data/tweets'
import { ModalType } from '@/types/modal'
import { useState } from 'react'

export default function StudioPage() {
  const [modal, setModal] = useState<ModalType | null>(null)

  return (
    <StudioLayout stats={studioStats}>
      <StudioTabs
        videos={studioVideos}
        playlists={studioPlaylists}
        tweets={tweets}
        setModal={setModal}
      />
      <FormModal
        open={modal?.type === 'upload-video' || modal?.type === 'edit-video'}
        onClose={() => setModal(null)}
        title={modal?.type === 'edit-video' ? 'Edit Video' : 'Upload Video'}
      >
        {(modal?.type === 'upload-video' || modal?.type === 'edit-video') && (
          <VideoForm
            data={modal.type === 'edit-video' ? modal.data : undefined}
          />
        )}
      </FormModal>

      <ConfirmModal
        open={modal?.type === 'delete-video'}
        onClose={() => setModal(null)}
        title="Delete Video?"
        description="This action cannot be undone"
        onConfirm={() => {
          if (modal?.type === 'delete-video') {
            console.log('delete video id:', modal.data.id)
          }
          setModal(null)
        }}
      />
    </StudioLayout>
  )
}
